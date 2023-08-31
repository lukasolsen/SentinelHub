import express from "express";
import { Request, Response, NextFunction } from "express";
import { generateHash, generateMD5, getEmailContent } from "../../utils/Util";
import { ParsedMail } from "mailparser";
import { Vendor } from "../../types/global";
import { CheckIP } from "../../service/protection-service";
import {
  EMAIL_REGEX,
  IPV4_REGEX,
  IPV6_REGEX,
  URL_REGEX,
  UUID_REGEX,
  extractFromText,
} from "../../utils/stringExtractor";
const auth = require("../auth");
const router = express.Router();

type FromType = {
  value: {
    address: string;
    name: string;
  };
  html: string;
  text: string;
};

type HeaderLine = {
  key: string;
  line: string;
  value: string;
};

type HeadersT = {
  html: string;
  messageId: string;
  subject: string;
  text: string;
  textAsHtml: string;
};

interface Data {
  attachments: string[];
  date: string;
  from: FromType;
  headerLines: HeaderLine[];
  headers: HeadersT;
  html: string;
  messageId: string;
  subject: string;
  to: FromType;
}

interface IEmail {
  reportId: number;
  timestamp: string;
  emailHash: string;
  tags: string[];
  data: Data;
  metadata: {
    date: string;
    from: string;
    to?: string;
    ip: string;
    size: number;
    subject: string;
    md5: string;
    sha256: string;
  };
  strings: TStrings;
  vendors: VendorOutput[];
  verdict: string;
  country: {
    code: string;
    name: string;
  };
}

interface VendorOutput {
  name: string;
  url: string;
  isThreat: boolean;
  data?: VendorData;
}

type VendorData = {
  tags?: string[];
};
// Simulated data for bad emails
const badEmails: IEmail[] = [];

// Middleware to handle request parameters
router.param("id", (req, res, next, id) => {
  req.body.id = id;
  next();
});

router.param("ip", (req, res, next, ip) => {
  req.body.ip = ip;
  next();
});

router.param("verdict", (req, res, next, verdict) => {
  req.body.verdict = verdict;
  next();
});

// Get a bad email by ID
router.get(
  "/bad-email/:id",
  auth.optional,
  function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const email = badEmails.find((item) => item.reportId === parseInt(id));
    const emailWithoutTo = email
      ? { ...email, metadata: { ...email.metadata, to: undefined } }
      : null;
    res.send(emailWithoutTo);
  }
);

router.get(
  "/bad-emails",
  auth.optional,
  function (req: Request, res: Response, next: NextFunction) {
    // remove the "to" field from the response
    const emailsWithoutTo = badEmails.map(({ metadata, ...rest }) => ({
      ...rest,
      metadata: { ...metadata, to: undefined },
    }));
    res.send(emailsWithoutTo);
  }
);

router.get(
  "/related-reports",
  auth.optional,
  function (req: Request, res: Response, next: NextFunction) {
    const { ip, id, verdict } = req.query; // Use req.query to get query parameters
    console.log("ip ->", ip);
    console.log("id ->", id);
    console.log("verdict ->", verdict);

    const equalVerdicts = badEmails.filter(
      (item) => item.reportId !== parseInt(id) && item.verdict === verdict
    );

    const equalIPs = equalVerdicts.filter(
      (item) => item.metadata.ip === ip && item.reportId !== parseInt(id)
    );

    res.send({
      reports: {
        equalIPs: equalIPs,
        equalVerdicts: equalVerdicts,
      },
    });
  }
);

router.post(
  "/add-bad-email",
  auth.optional,
  async function (req: Request, res: Response, next: NextFunction) {
    const { emailContent } = req.body;
    const parsed = await getEmailContent(emailContent);

    const receivedSpfLine = parsed.headerLines.find(
      (item) => item.key === "received-spf"
    );
    const ip = receivedSpfLine?.line.split("client-ip=")[1].split(";")[0] || "";

    const newBadEmail = await createBadEmailEntry(parsed, ip);
    // Extract all possible strings
    const strings = extractStrings(parsed);
    console.log(strings);
    // Add the strings to the bad email entry
    newBadEmail.strings = strings;

    console.log(newBadEmail);

    badEmails.push(newBadEmail);
    res.send({ status: "ok", id: newBadEmail.reportId });
  }
);

const createBadEmailEntry = async (
  parsed: ParsedMail,
  ip: string
): Promise<Vendor> => {
  const data = await CheckIP(ip);
  const sha256 = generateHash(parsed.from.value[0].address);

  console.log("data ->", data);

  return {
    data: parsed,
    reportId: Math.floor(Math.random() * 1000000),
    timestamp: new Date().toString(),
    emailHash: sha256,
    tags: data.tags,
    metadata: {
      size: data.size,
      subject: parsed.subject,
      date: parsed.date.toISOString(),
      from: parsed.from.value[0].address,
      ip: ip,
      md5: generateMD5(parsed.from.value[0].address),
      sha256: sha256,
    },
    vendors: data.vendors,
    verdict: data.verdict,
    country: {
      code: data.country.code,
      name: data.country.name,
    },
    //families_seen: data.family_seen,
  };
};

type TStringType = {
  name: string;
  display_name: string;
  families: TStringFamily[];
  color: string;
};

type TStringFamily = {
  name: string;
  display_name?: string;
  color: string;
};

type TStringTag = {
  name: string;
  display_name: string;
  color: string;
};

type StringType = {
  string: string;
  tags: TStringTag[];
};

type TStrings = {
  familyTypes: TStringType[];
  families: TStringFamily[];
  strings: [
    {
      name: string;
      family: string;
      familyType: string;
      strings: StringType[];
    }
  ];
};
/*

      ipv4: {
        tags: [],
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: ipv4,
      },
      ipv6: {
        tags: ["IP"],
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: ipv6,
      },
      email: {
        tags: ["email"],
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: emailAddresses,
      },
      urls: {
        tags: ["url"],
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: url,
      },
      paths: {
        tags: ["path"],
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: [],
      },
      addresses: {
        tags: ["address"],
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: [],
      },
      uuid: {
        tags: ["uuid"],
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: uuid,
      },
*/

const DEFAULT_FAMILY_TYPE = "common";
const DEFAULT_FAMILY = "common";

const extractStrings = (email: ParsedMail): TStrings => {
  if (!email.html) return {} as TStrings;

  const regexes: RegExp[] = [
    IPV4_REGEX,
    IPV6_REGEX,
    EMAIL_REGEX,
    URL_REGEX,
    UUID_REGEX,
    // Add more regexes as needed
  ];

  const extractedStrings = extractFromText(email.html, regexes);

  const ipv4Strings = extractedStrings.filter((string) =>
    IPV4_REGEX.test(string)
  );
  const ipv6Strings = extractedStrings.filter((string) =>
    IPV6_REGEX.test(string)
  );
  const emailStrings = extractedStrings.filter((string) =>
    EMAIL_REGEX.test(string)
  );
  const urlStrings = extractedStrings.filter((string) =>
    URL_REGEX.test(string)
  );
  const uuidStrings = extractedStrings.filter((string) =>
    UUID_REGEX.test(string)
  );

  const familyTypes: TStringType[] = [
    {
      name: "malware",
      display_name: "Malware",
      families: [
        {
          name: "masslogger",
          display_name: "MassLogger",
          color: "#ff9800",
        },
        // Add more malware families...
      ],
      color: "#f44336",
    },
    {
      name: "common",
      display_name: "Common",
      families: [
        {
          name: "common",
          display_name: "Common",
          color: "#4caf50",
        },
      ],
      color: "#4caf50",
    },
    // Add more types...
  ];

  const tags: TStringTag[] = [
    {
      name: "generic",
      display_name: "Generic",
      color: "#4caf50",
    },
    // Add more tags...
  ];

  const strings: TStrings = {
    familyTypes,
    strings: [
      {
        name: "ipv4",
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: ipv4Strings.map((string) => ({
          string,
          tags: ["ipv4"],
          family: DEFAULT_FAMILY,
          familyType: DEFAULT_FAMILY_TYPE,
        })),
      },
      {
        name: "ipv6",
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: ipv6Strings.map((string) => ({
          string,
          tags: ["ipv6"],
          family: DEFAULT_FAMILY,
          familyType: DEFAULT_FAMILY_TYPE,
        })),
      },
      {
        name: "email",
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: emailStrings.map((string) => ({
          string,
          tags: ["email"],
          family: DEFAULT_FAMILY,
          familyType: DEFAULT_FAMILY_TYPE,
        })),
      },
      {
        name: "urls",
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: urlStrings.map((string) => ({
          string,
          tags: ["url"],
          family: DEFAULT_FAMILY,
          familyType: DEFAULT_FAMILY_TYPE,
        })),
      },
      {
        name: "uuid",
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
        strings: uuidStrings.map((string) => ({
          string,
          tags: ["uuid"],
          family: DEFAULT_FAMILY,
          familyType: DEFAULT_FAMILY_TYPE,
        })),
      },
      // Add more string types if needed
    ],
  };

  return strings;
};

module.exports = router;

import { ParsedMail, simpleParser } from "mailparser";
import { Response, Request } from "express";
import { generateHash, generateMD5, getEmailContent } from "../../utils/Util";
import { CheckIP } from "../../service/protection-service";
import { Vendor } from "../../types/global";
import {
  EMAIL_REGEX,
  IPV4_REGEX,
  IPV6_REGEX,
  URL_REGEX,
  UUID_REGEX,
  extractFromText,
} from "../../utils/stringExtractor";

const badEmails: IDataOutput[] = [];

export const emailParsing = async (req: Request, res: Response) => {
  const { emailContent } = req.body;

  try {
    const parsed = await getEmailContent(emailContent);
    res.send({ content: parsed, status: "ok" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

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

export const addBadEmail = async (req: Request, res: Response) => {
  const { emailContent } = req.body;

  try {
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
  } catch (error) {
    res.status(500).send({ message: error.message, status: "error" });
  }
};

export const getBadEmails = (req: Request, res: Response) => {
  const emailsWithoutTo = badEmails.map(({ metadata, ...rest }) => ({
    ...rest,
    metadata: { ...metadata, to: undefined },
  }));
  res.send(emailsWithoutTo);
};

export const getBadEmail = (req: Request, res: Response) => {
  const { id } = req.params;
  const email = badEmails.find((item) => item.reportId === parseInt(id));
  const emailWithoutTo = email
    ? { ...email, metadata: { ...email.metadata, to: undefined } }
    : null;
  res.send(emailWithoutTo);
};

export const getRelatedReports = (req: Request, res: Response) => {
  const { ip, id, verdict } = req.body;

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
  const ipv4 = extractFromText(email.html, IPV4_REGEX);
  const ipv6 = extractFromText(email.html, IPV6_REGEX);
  const emailAddresses = extractFromText(email.html, EMAIL_REGEX);
  const url = extractFromText(email.html, URL_REGEX);
  const uuid = extractFromText(email.html, UUID_REGEX);

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
    strings: [],
  };

  const stringTypes = [
    { name: "uuid", strings: uuid },
    { name: "ipv4", strings: ipv4 },
    { name: "ipv6", strings: ipv6 },
    { name: "email", strings: emailAddresses },
    { name: "urls", strings: url },

    // Add more string types if needed
  ];

  strings.strings = [
    ...stringTypes.map((item) => ({
      name: item.name,
      strings: item.strings.map((string) => ({
        string: string,
        tags: ["test"],
        family: DEFAULT_FAMILY,
        familyType: DEFAULT_FAMILY_TYPE,
      })),
      tags: tags.map((tag) => tag.name),
    })),
  ];

  return strings;
};

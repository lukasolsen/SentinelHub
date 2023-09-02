import express from "express";
import { Request, Response, NextFunction } from "express";
import { generateHash, generateMD5, getEmailContent } from "../../utils/Util";
import { ParsedMail } from "mailparser";
import { Vendor } from "../../types/global";
import { CheckIP } from "../../service/protection-service";
import { extractStrings } from "../../utils/stringExtractor";
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

// Remove fields from the response, based on whitelists
// Sanitize an email by deleting specific fields
const sanitizeEmail = (email: IEmail, whitelist: string[] = []): IEmail => {
  if (email) {
    // Create a sanitized copy of the email
    const sanitizedEmail: IEmail = { ...email };

    const fieldsToDelete = [
      "strings",
      "vendors",
      "metadata.to",
      "data.headers",
      "data.to",
      "data.headerLines",
      "data.html",
      "data.text",
      "data.textAsHtml",
    ];

    // Iterate through the fields to delete and remove them
    for (const field of fieldsToDelete) {
      if (!whitelist.includes(field)) delete sanitizedEmail[field];
    }

    return sanitizedEmail;
  }
  return email; // Return the original email if it's null or undefined
};

// ? Get bad email by ID
router.get(
  "/get/:id",
  auth.optional,
  function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const email = badEmails.find((item) => item.reportId === parseInt(id));
    const sanitizedEmail = sanitizeEmail(email);
    res.send(sanitizedEmail);
  }
);

// ? Get related samples by ID with pagination
router.get(
  "/get/:id/related-samples",
  auth.optional,
  function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const { offset } = req.query;
    const email = badEmails.find((item) => item.reportId === parseInt(id));

    if (email) {
      // Define pagination parameters
      const startIndex = offset ? parseInt(offset) : 0;
      const samplesPerPage = 5;

      // Filter related samples
      const relatedSamples = badEmails
        .filter(
          (item) =>
            item.reportId !== parseInt(id) && item.verdict === email.verdict
        )
        .slice(startIndex, startIndex + samplesPerPage);

      // Sanitize related samples (remove unnecessary fields)
      const sanitizedRelatedSamples = relatedSamples.map((item) =>
        sanitizeEmail(item)
      );

      // Return the sanitized related samples along with pagination information
      res.send({
        relatedSamples: sanitizedRelatedSamples,
        totalRelatedSamples: relatedSamples.length, // Provide the total number of related samples
        currentPage: Math.floor(startIndex / samplesPerPage) + 1, // Calculate the current page
        samplesPerPage,
      });
    } else {
      res.status(404).send({ message: "Report not found" });
    }
  }
);

// ? Get vendors from report
router.get(
  "/get/:id/vendors",
  auth.optional,
  function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const email = badEmails.find((item) => item.reportId === parseInt(id));

    const sanitizedEmail = sanitizeEmail(email, ["vendors"]);
    res.send(sanitizedEmail?.vendors || []); // Return an empty array if vendors are not found
  }
);

// ? Get strings from id
router.get(
  "/get/:id/strings",
  auth.optional,
  function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const email = badEmails.find((item) => item.reportId === parseInt(id));

    const sanitizedEmail = sanitizeEmail(email, ["strings"]);
    res.send(sanitizedEmail?.strings || []); // Return an empty array if strings are not found
  }
);

//TODO: Needs to be fixed for newer data
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

//TODO: Implement a statistics endpoint
router.get(
  "/statistics",
  auth.optional,
  function (req: Request, res: Response, next: NextFunction) {
    const totalEmails = badEmails.length;
    const totalSafe = badEmails.filter((item) => item.isSafe).length;
    const totalThreats = badEmails.filter((item) => !item.isSafe).length;

    // Get all the amount of safe emails, and threats number, from dates.

    /* Data required for Pie Chart:
              data={[
                {
                  id: "safe",
                  label: "Safe",
                  value: 2290,
                  color: "hsl(120, 70%, 50%)", // Green color for safe files
                },
                {
                  id: "threats",
                  label: "Threats",
                  value: 20111,
                  color: "hsl(0, 70%, 50%)", // Red color for malicious files
                },
              ]}
            */

    //get all reports, but just get the date, and verdict
    const lineChartData = badEmails.map((item) => ({
      date: item.metadata.date,
      verdict: item.verdict,
    }));

    //Make a list with the date as the key, and the value as the amount of safe emails, and threats
    const lineChartDataDict = {};
    lineChartData.forEach((item) => {
      if (lineChartDataDict[item.date]) {
        if (item.verdict === "safe") {
          lineChartDataDict[item.date].safe += 1;
        } else {
          lineChartDataDict[item.date].threats += 1;
        }
      } else {
        lineChartDataDict[item.date] = {
          safe: item.verdict === "safe" ? 1 : 0,
          threats: item.verdict === "safe" ? 0 : 1,
        };
      }
    });

    res.send({
      totalEmails,
      totalSafe,
      totalThreats,
      pieChartData: [
        {
          id: "safe",
          label: "Safe",
          value: totalSafe,
          color: "hsl(142, 79%, 36%)", // Green color for safe files
        },
        {
          id: "threats",
          label: "Threats",
          value: totalThreats,
          color: "#dc2626", // Red color for malicious files
        },
      ],
      lineChartData: [
        {
          id: "safe",
          label: "Safe",
          color: "hsl(142, 79%, 36%)",
          data: Object.keys(lineChartDataDict).map((key) => ({
            x: key,
            y: lineChartDataDict[key].safe,
          })),
        },
        {
          id: "threats",
          label: "Threats",
          color: "#dc2626",
          data: Object.keys(lineChartDataDict).map((key) => ({
            x: key,
            y: lineChartDataDict[key].threats,
          })),
        },
      ],
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
    const strings = extractStrings(emailContent);
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
    isSafe: data.verdict.toLowerCase() === "safe" ? true : false,
    totalVendorsSafe: data.vendors.filter((item) => item.isThreat === false)
      .length,
    totalVendorsThreats: data.vendors.filter((item) => item.isThreat === true)
      .length,
    totalVendors: data.vendors.length,
    country: {
      code: data.country.code,
      name: data.country.name,
    },
    //families_seen: data.family_seen,
  };
};
module.exports = router;

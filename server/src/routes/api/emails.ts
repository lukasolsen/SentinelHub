import express from "express";
import { Request, Response, NextFunction } from "express";
import { generateHash, generateMD5, getEmailContent } from "../../utils/Util";
import { ParsedMail } from "mailparser";
import { CheckIP } from "../../service/protection-service";
import { extractStrings } from "../../utils/stringExtractor";
import {
  CreateReport,
  FindReport,
  ListReports,
} from "../../service/report-service";
import { yaraScan } from "../../utils/yaraScanner";
const router = express.Router();

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
    //console.log("email ->", email);
    // Create a sanitized copy of the email
    const sanitizedEmail: IEmail = email;

    const fieldsToDelete = [
      "_id",
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

  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;

    const email = await FindReport(id);
    const sanitizedEmail = sanitizeEmail(email);
    res.send(sanitizedEmail);
  }
);

// ? Get related samples by ID with pagination
router.get(
  "/get/:id/related-samples",

  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const { offset } = req.query;
    const badEmails = await ListReports();
    const email = await badEmails.find(
      (item) => item.reportId === parseInt(id)
    );
    //aq

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

  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const email = await FindReport(id);

    const sanitizedEmail = sanitizeEmail(email, ["vendors"]);
    res.send(sanitizedEmail?.vendors || []); // Return an empty array if vendors are not found
  }
);

// ? Get strings from id
router.get(
  "/get/:id/strings",

  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const email = await FindReport(id);

    const sanitizedEmail = sanitizeEmail(email, ["strings"]);
    res.send(sanitizedEmail?.strings || []); // Return an empty array if strings are not found
  }
);

//TODO: Needs to be fixed for newer data
router.get(
  "/get-all",

  async function (req: Request, res: Response, next: NextFunction) {
    // remove the "to" field from the response
    const Emails = await ListReports();

    const emailsWithoutTo = Emails.map((item) => sanitizeEmail(item));

    res.send(emailsWithoutTo);
  }
);

//TODO: Implement a statistics endpoint
router.get(
  "/statistics",

  async function (req: Request, res: Response, next: NextFunction) {
    const emails = await ListReports();

    const totalEmails = emails.length;
    const totalSafe = emails.filter(
      (item) => item.verdict.toLowerCase() === "safe"
    ).length;
    const totalThreats = emails.filter(
      (item) => item.verdict.toLowerCase() !== "safe"
    ).length;

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
    const lineChartData = emails.map((item) => ({
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

// ? Scans an email and returns the report ID
router.post(
  "/scan",

  async function (req: Request, res: Response, next: NextFunction) {
    const { emailContent } = req.body;
    const parsed = await getEmailContent(emailContent);

    const receivedSpfLine = parsed.headerLines.find(
      (item) => item.key === "received-spf"
    );
    const ip = receivedSpfLine?.line.split("client-ip=")[1].split(";")[0] || "";

    const newBadEmail = await createBadEmailEntry(parsed, ip);
    const scannedYara = await yaraScan(emailContent);

    console.log("yaraScan ->", scannedYara);

    const strings = extractStrings(emailContent);

    newBadEmail.strings = strings;
    newBadEmail.yara = scannedYara;

    await CreateReport(newBadEmail);
    res.send({ status: "ok", id: newBadEmail.reportId });
  }
);

const createBadEmailEntry = async (
  parsed: ParsedMail,
  ip: string
): Promise<Vendor> => {
  const data = await CheckIP(ip);
  const sha256 = generateHash(parsed.from.value[0].address);

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

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
  SearchReport,
} from "../../service/report-service";
import { yaraScan } from "../../utils/yaraScanner";
import { IReport } from "../../models/Report";
import { VerifyUser } from "../../service/user-service";
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
const sanitizeEmail = (email: EEmail, whitelist: string[] = []): EEmail => {
  if (email) {
    // Create a sanitized copy of the email
    const sanitizedEmail: EEmail = { ...email };

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
      if (!whitelist.includes(field)) {
        delete (sanitizedEmail as any)[field]; // Use type assertion here
      }
    }

    return sanitizedEmail;
  }
  return email; // Return the original email if it's null or undefined
};

//make middleware to check the token sent in the request.
const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | object> => {
  const { token } = req.query as { token: string };
  if (!VerifyUser(token))
    return res.status(401).send({ message: "No permissions", status: "error" });
  next();
};

// ? Get bad email by ID
router.get(
  "/get/:id",
  checkToken,
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
  checkToken,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const { offset } = req.query as { offset: string };
    const badEmails = await ListReports();
    const email = await badEmails.find(
      (item) => item.reportId === parseInt(id)
    );
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
  checkToken,
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
  checkToken,
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
  checkToken,
  async function (req: Request, res: Response, next: NextFunction) {
    // remove the "to" field from the response
    const Emails = await ListReports();

    const emailsWithoutTo = Emails.map((item) => sanitizeEmail(item));

    res.send(emailsWithoutTo);
  }
);

interface ReportStats {
  totalEmails: number;
  totalSafe: number;
  totalThreats: number;
  pieChartData: {
    id: string;
    label: string;
    value: number;
    color: string;
  }[];
  lineChartData: {
    id: string;
    label: string;
    color: string;
    data: { x: string; y: number }[];
  }[];
}

router.get(
  "/statistics",
  checkToken,
  async function (req: Request, res: Response, next: NextFunction) {
    const emails = await ListReports();

    const totalEmails = emails.length;
    const totalSafe = emails.filter(
      (item) => item.verdict.toLowerCase() === "safe"
    ).length;
    const totalThreats = emails.filter(
      (item) => item.verdict.toLowerCase() !== "safe"
    ).length;

    const lineChartData: { date: string; verdict: string }[] = emails.map(
      (item) => ({
        date: item.metadata.date,
        verdict: item.verdict,
      })
    );

    const lineChartDataDict: {
      [key: string]: { safe: number; threats: number };
    } = {};

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

    const pieChartData = [
      {
        id: "safe",
        label: "Safe",
        value: totalSafe,
        color: "hsl(142, 79%, 36%)",
      },
      {
        id: "threats",
        label: "Threats",
        value: totalThreats,
        color: "#dc2626",
      },
    ];

    const formattedLineChartData = [
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
    ];

    const stats: ReportStats = {
      totalEmails,
      totalSafe,
      totalThreats,
      pieChartData,
      lineChartData: formattedLineChartData,
    };

    res.send(stats);
  }
);

// ? Scans an email and returns the report ID
router.post(
  "/scan",
  checkToken,
  async function (req: Request, res: Response, next: NextFunction) {
    const { emailContent } = req.body as { emailContent: string };
    const parsed = await getEmailContent(emailContent);

    const receivedSpfLine = parsed.headerLines.find(
      (item: EHeaderLine) => item.key === "received-spf"
    );
    const ip = receivedSpfLine?.line.split("client-ip=")[1].split(";")[0] || "";

    const newBadEmail = await createBadEmailEntry(parsed, ip);

    newBadEmail.strings = extractStrings(emailContent);
    newBadEmail.yara = await yaraScan(emailContent);

    await CreateReport(newBadEmail);
    res.send({ status: "ok", id: newBadEmail.reportId });
  }
);

// ? Search for emails
router.post(
  "/search",
  checkToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the query string from the request body
      const { queryString } = req.body;

      if (!queryString) {
        res.status(400).json({ error: "Missing query string" });
        return;
      }

      // Split the query string into individual search criteria
      const criteria = queryString.split(" AND "); // You can use a different separator if needed

      // Define a base MongoDB query
      const baseQuery: any = {};

      // Define mapping for keywords to MongoDB fields
      const keywordMap: Record<string, string> = {
        email: "data.from.value.address",
        verdict: "verdict",
        ip: "metadata.ip",
        country: "country.name",
        date: "metadata.date",
        tag: "tags",
      };

      // Iterate through the criteria and build the MongoDB query
      criteria.forEach((criterion) => {
        const [keyword, value] = criterion.split(":");
        const field = keywordMap[keyword];

        if (field && value) {
          if (field === "tags") {
            baseQuery[field] = { $in: [value] };
          } else {
            baseQuery[field] = value;
          }
        }
      });

      // If no specific field provided, search by emailHash
      if (Object.keys(baseQuery).length === 0) {
        const emailHashQuery = {
          emailHash: queryString,
        };
        const emailHashResults: IReport[] = await SearchReport(emailHashQuery);
        res.json(emailHashResults);
        return;
      }

      // Execute the MongoDB query
      const results: IReport[] = await SearchReport(baseQuery);

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

const createBadEmailEntry = async (
  parsed: ParsedMail,
  ip: string
): Promise<EEmail> => {
  const data = await CheckIP(ip);
  const sha256 = generateHash(parsed.from.value[0].address);

  const entry: EEmail = {
    data: parsed as EEmailData,
    reportId: Math.floor(Math.random() * 1000000),
    timestamp: new Date().toString(),
    emailHash: sha256,
    tags: data.tags,
    metadata: {
      subject: parsed.subject || "",
      date: parsed.date?.toISOString() || new Date().toISOString(),
      from: parsed.from?.value[0].address || "",
      ip: ip,
      md5: generateMD5(parsed.from?.value[0].address || ""),
      sha256: sha256,
    },
    vendors: data.vendors,
    verdict: data.verdict,
    isSafe: data.verdict.toLowerCase() === "safe",
    totalVendorsSafe: data.vendors.filter((item) => !item.isThreat).length,
    totalVendorsThreats: data.vendors.filter((item) => item.isThreat).length,
    totalVendors: data.vendors.length,
    country: {
      code: data.country.code,
      name: data.country.name,
    },
  };

  return entry;
};

module.exports = router;

import { ParsedMail, simpleParser } from "mailparser";
import { Response, Request } from "express";
import { generateHash } from "../../utils/Util";
import { CheckIP } from "../../service/protection-service";

export const emailParsing = (req: Request, res: Response) => {
  const { emailContent } = req.body;

  simpleParser(emailContent)
    .then((parsed) => {
      res.send({ content: parsed, status: "ok" });
    })
    .catch((error) => {
      console.error("Error parsing email:", error);
      res.status(500).send("Internal Server Error");
    });
};

const badEmails: IDataOutput[] = [];

export const addBadEmail = async (req: Request, res: Response) => {
  const { emailContent } = req.body;

  simpleParser(emailContent)
    .then(async (parsed: ParsedMail) => {
      const ip = parsed.headerLines
        .find((item) => item.key === "received-spf")
        .line.split("client-ip=")[1]
        .split(";")[0];

      const data = await CheckIP(ip);
      badEmails.push({
        data: parsed,
        reportId: Math.floor(Math.random() * 1000000),
        timestamp: new Date().toString(),
        emailHash: generateHash(parsed.from.value[0].address),
        tags: data.tags,

        metadata: {
          size: data.size,
          subject: parsed.subject,
          from: parsed.from.value[0].address,
          to: parsed.to.value[0].address,
          date: parsed.date,
          ip: ip,
        },

        vendors: data.vendors,
        verdict: data.verdict,
      });

      res.send({ status: "ok", id: badEmails[badEmails.length - 1].reportId });
    })
    .catch((error) => {
      console.error("Error parsing email:", error);
      res.status(500).send("Internal Server Error");
    });
};

export const getBadEmails = (req: Request, res: Response) => {
  const emails = badEmails;
  //Remove a metadata.to key from each email
  emails.forEach((email) => {
    delete email.metadata.to;
  });
  return res.send(badEmails);
};

export const getBadEmail = (req: Request, res: Response) => {
  console.log("Contacted");
  const { id } = req.params;
  const email = badEmails.find((item) => item.reportId === parseInt(id));
  delete email.metadata.to;
  return res.send(email);
};

export const getRelatedReports = (req: Request, res: Response) => {
  const { ip, id, verdict } = req.params;

  if (ip) {
    const emails = badEmails.filter((item) => item.metadata.ip === ip);
    emails.forEach((email) => {
      delete email.metadata.to;
    });
    return res.send(emails);
  }

  if (id) {
    const email = badEmails.find((item) => item.reportId === parseInt(id));
    delete email.metadata.to;
    return res.send(email);
  }

  if (verdict) {
    const emails = badEmails.filter((item) => item.threat === verdict);
    emails.forEach((email) => {
      delete email.metadata.to;
    });
    return res.send(emails);
  }
};

import { ParsedMail, simpleParser } from "mailparser";
import { Response, Request } from "express";
import { generateHash } from "../../utils/Util";
import { CheckIP } from "../../service/protection-service";

export const emailParsing = (req: Request, res: Response) => {
  const { emailContent } = req.body;
  console.log("emailContent: ", emailContent);

  simpleParser(emailContent)
    .then((parsed) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send({ content: parsed, status: "ok" });
    })
    .catch((error) => {
      console.error("Error parsing email:", error);
      res.status(500).send("Internal Server Error");
    });
};

const badEmails: ResponseData[] = [];

export const addBadEmail = async (req: Request, res: Response) => {
  const { emailContent } = req.body;

  simpleParser(emailContent)
    .then(async (parsed: ParsedMail) => {
      const ip = parsed.headerLines
        .find((item) => item.key === "received-spf")
        .line.split("client-ip=")[1]
        .split(";")[0];

      const data = await CheckIP(ip);
      console.log(data.threat);
      badEmails.push({
        data: parsed,
        id: Math.floor(Math.random() * 1000000),
        lastUpdated: new Date().toString(),
        ip: ip,
        hash: generateHash(parsed.from.value[0].address),
        vendors: data.vendors,
        threat: data.threat ? "Threat" : "Safe",
      });

      res.send({ status: "ok", id: badEmails[badEmails.length - 1].id });
    })
    .catch((error) => {
      console.error("Error parsing email:", error);
      res.status(500).send("Internal Server Error");
    });
};

export const getBadEmails = (req: Request, res: Response) => {
  return res.send(badEmails);
};

export const getBadEmail = (req: Request, res: Response) => {
  const { id } = req.params;
  const email = badEmails.find((item) => item.id === parseInt(id));
  return res.send(email);
};

import { ParsedMail, simpleParser } from "mailparser";
import { Response, Request } from "express";
import { generateHash, generateMD5 } from "../../utils/Util";
import { CheckIP } from "../../service/protection-service";
import { Vendor } from "../../types/global";
import {
  EMAIL_REGEX,
  IPV4_REGEX,
  IPV6_REGEX,
  URL_REGEX,
  extractFromText,
} from "../../utils/stringExtractor";

const badEmails: IDataOutput[] = [];

const getEmailContent = async (emailContent: string): Promise<ParsedMail> => {
  try {
    return await simpleParser(emailContent);
  } catch (error) {
    console.error("Error parsing email:", error);
    throw new Error("Internal Server Error");
  }
};

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

type TStrings = {
  ipv4: string[];
  ipv6: string[];
  email: string[];
  urls: string[];
  paths: string[];
  addresses: string[];
};

export const extractStrings = (email: ParsedMail): TStrings => {
  const ipv4 = extractFromText(email.html, IPV4_REGEX);
  const ipv6 = extractFromText(email.html, IPV6_REGEX);
  const emailAddresses = extractFromText(email.html, EMAIL_REGEX);
  const url = extractFromText(email.html, URL_REGEX);

  return {
    ipv4,
    ipv6,
    email: emailAddresses,
    urls: url,
    paths: [],
    addresses: [],
  };
};

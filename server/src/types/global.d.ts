interface Attachment {
  fileName: string;
  contentType: string;
  content: Buffer; // Replace with the appropriate type for attachment content
}

interface EmailHeader {
  key: string;
  line: string;
  value: string;
}

interface EmailHeaders {
  html: string;
  messageId: string;
  subject: string;
  text: string;
  textAsHtml: string;
}

interface EmailAddress {
  address: string;
  name: string;
}

interface EmailContact {
  value: EmailAddress;
  html: string;
  text: string;
}

interface EmailData {
  attachments: Attachment[];
  date: string;
  from: EmailContact;
  to: EmailContact;
  headerLines: EmailHeader[];
  headers: EmailHeaders;
  html: string;
  messageId: string;
  subject: string;
}

interface EmailMetadata {
  date: string;
  from: string;
  to?: string;
  ip: string;
  size: number;
  subject: string;
  md5: string;
  sha256: string;
}

interface VendorData {
  tags?: string[];
}

interface VendorCountry {
  name: string;
  code: number;
}

interface Vendor {
  name: string;
  url: string;
  isThreat: boolean;
  tags: string[];
  data?: VendorData;
  country?: VendorCountry;
}

interface EmailReport {
  data: EmailData;
  emailHash: string;
  metadata: EmailMetadata;
  reportId: number;
  tags: string[];
  verdict: string;
  timestamp: string;
  vendors: Vendor[];
  country: VendorCountry;
}

interface RelatedReports {
  equalIPs: EmailReport[];
  equalVerdicts: EmailReport[];
}

export {
  Attachment,
  EmailHeader,
  EmailHeaders,
  EmailAddress,
  EmailContact,
  EmailData,
  EmailMetadata,
  VendorData,
  VendorCountry,
  Vendor,
  EmailReport,
  RelatedReports,
};

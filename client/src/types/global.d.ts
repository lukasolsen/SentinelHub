type Data = {
  attachments: string[];
  date: string;
  from: FromType;
  headerLines: HeaderLine[];
  headers: HeadersT;
  html: string;
  messageId: string;
  subject: string;
  to: FromType;
};

type ResponseData = {
  id: number;
  ip: string;
  lastUpdated: string;
  threat: string;
  vendors?: Vendors[];
  data: Data;
  hash: string;
};

type Vendors = {
  name: string;
  url: string;
  isThreat: boolean;
  data?: VendorData[];
};

type VendorData = {
  as_name?: string;
  as_number?: number;
  country?: string;
  ip_address?: string;
  last_seen?: string;
  malware?: string;
  port?: number;
  status?: string;
  hostname?: string;
};

type HeadersT = {
  html: string;
  messageId: string;
  subject: string;
  text: string;
  textAsHtml: string;
};

type HeaderLine = {
  key: string;
  line: string;
  value: string;
};

type FromType = {
  value: FromValueTypew;
  html: string;
  text: string;
};

type FromValueTypew = {
  address: string;
  name: string;
};

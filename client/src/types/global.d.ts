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

interface IDataOutput {
  data: Data;
  emailHash: string;
  metadata: IMetadata;
  reportId: number;
  tags: string[];
  verdict: string;
  timestamp: string;
  vendors: VendorOutput[];
}

interface IMetadata {
  date: string;
  from: string;
  to?: string;
  ip: string;
  size: number;
  subject: string;
  md5: string;
  sha256: string;
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

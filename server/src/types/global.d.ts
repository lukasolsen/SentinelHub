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

type outputYara = {
  rule: string;
  found: boolean;
  meta: {
    description: string;
    author: string;
  };
  output: any;
};
/*  STRINGS  */

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
  strings: {
    name: string;
    family: string;
    familyType: string;
    strings: StringType[];
  }[];
};

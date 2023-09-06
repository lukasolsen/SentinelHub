// EMAIL DATA TYPES

// Represents the 'from' or 'to' value in an email
interface EEmailValue {
  address: string;
  name: string;
  html: string;
  text: string;
}

// Represents header lines in an email
interface EHeaderLine {
  key: string;
  line: string;
}

// Represents email headers
interface EEmailHeaders {
  html: string;
  messageId: string;
  subject: string;
  text: string;
  textAsHtml: string;
}

// Represents an email's data
interface EEmailData {
  attachments: string[];
  date: string;
  from: EEmailValue;
  headerLines: EHeaderLine[];
  headers: EEmailHeaders;
  html: string;
  messageId: string;
  subject: string;
  to: EEmailValue;
}

// Represents email metadata
interface EEmailMetadata {
  date: string;
  from: string;
  to?: string;
  ip: string;
  subject: string;
  md5: string;
  sha256: string;
}

// Represents vendor output data
interface EVendorOutputData {
  tags?: string[];
}

// Represents a complete vendor output
interface EVendorOutput {
  name: string;
  url: string;
  isThreat: boolean;
  tags?: string[];
  country?: {
    code: number;
    name: string;
  };
  data?: EVendorOutputData;
}

// Represents Yara rule output
interface EYaraRuleOutput {
  rule: string;
  found: boolean;
  meta: {
    description: string;
    author: string;
  };
  output: any;
}

// Represents a country
interface ECountry {
  code: number;
  name: string;
}

// Represents an email
interface EEmail {
  _id?: string; // Only for MongoDB
  reportId: number;
  timestamp: string;
  emailHash: string;
  tags: string[];
  data: EEmailData;
  metadata: EEmailMetadata;
  strings: EStrings;
  vendors: EVendorOutput[];
  verdict: string;
  isSafe: boolean;
  totalVendorsSafe: number;
  totalVendorsThreats: number;
  totalVendors: number;
  yara: EYaraRuleOutput[];
  country: ECountry;
}

// STRING TYPES

// Represents a string type
interface EStringType {
  name: string;
  display_name: string;
  families: EStringFamily[];
  color: string;
}

// Represents a string family
interface EStringFamily {
  name: string;
  display_name?: string;
  color: string;
}

// Represents a string tag
interface EStringTag {
  name: string;
  display_name: string;
  color: string;
}

// Represents a string data
interface EStringData {
  tags: EStringTag[];
}

// Represents strings of a family type
interface EFamilyTypeStrings {
  name: string;
  family: string;
  familyType: string;
  strings: EStringType[];
}

// Represents string data including family types and strings
interface EStrings {
  familyTypes: EFamilyTypeStrings[];
}

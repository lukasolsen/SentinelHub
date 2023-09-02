export const extractFromText = (html: string, regexes: RegExp[]): string[] => {
  const extractedStrings: string[] = [];

  for (const regex of regexes) {
    const matches = html.match(regex);
    if (matches) {
      extractedStrings.push(...matches);
    }
  }

  return extractedStrings;
};
// Define your regex patterns here
export const regexPatterns = {
  URL: /((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))/gim,
  IPV4: /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/gm,
  IPV4_STRICT: /(?<!\d|\.)(?:\d{1,3}\.){3}\d{1,3}(?!\d|\.)/gm,
  IPV6: /((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\b/gim,
  IPV6_STRICT: /(?<![:.\w])(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}(?![:.\w])/gim,
  MAC_ADDRESS: /(?:[0-9A-Fa-f]{2}[:-]){5}(?:[0-9A-Fa-f]{2})/gim,
  MAC_ADDRESS_STRICT:
    /(?<![:.\w])(?:[A-F0-9]{2}[:-]){5}[A-F0-9]{2}(?![:.\w])/gim,
  EMAIL: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gim,
  EMAIL_STRICT:
    /(?<!\w)([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)(?!\w)/gim,
  UUID: /(?:[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}?)/gim,
  UUID_STRICT: /(?<!\w)(?:[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}?)(?!\w)/gim,
  PHONE_NUMBER: /(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/gim,
  PHONE_NUMBER_STRICT:
    /(?<!\w)(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}(?!\w)/gim,
};
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

const DEFAULT_FAMILY_TYPE = "common";
const DEFAULT_FAMILY = "common";

export const extractStrings = (html: string): TStrings => {
  const regexes: RegExp[] = Object.values(regexPatterns);

  const extractedStrings = extractFromText(html, regexes);

  const familyTypes = [
    {
      name: DEFAULT_FAMILY_TYPE,
      display_name: "Common",
      color: "#4290e9",
      families: [
        {
          name: DEFAULT_FAMILY,
          display_name: "Common",
          color: "#4290e9",
        },
        {
          name: "identity",
          display_name: "Identity",
          color: "#4290e9",
        },
      ],
    },
    {
      name: "malicious",
      display_name: "Malicious Content",
      color: "#ff0000",
      families: [
        {
          name: "phishing",
          display_name: "Phishing Scams",
          color: "#ff0000",
          description: "Deceptive emails aiming to steal personal information.",
        },
        {
          name: "ransomware",
          display_name: "Ransomware Payloads",
          color: "#ff0000",
          description:
            "Emails carrying malicious code that encrypts files for ransom.",
        },
        {
          name: "trojan",
          display_name: "Trojan Attachments",
          color: "#ff0000",
          description:
            "Emails containing Trojans designed to compromise systems.",
        },
      ],
    },
    {
      name: "advanced_threat",
      display_name: "Advanced Threats",
      color: "#ffca00",
      families: [
        {
          name: "zero_day",
          display_name: "Zero-Day Exploits",
          color: "#ffca00",
          description:
            "Emails with undisclosed exploits for unpatched vulnerabilities.",
        },
        {
          name: "APT",
          display_name: "Advanced Persistent Threats",
          color: "#ffca00",
          description: "Long-term cyberattacks with sophisticated tactics.",
        },
        {
          name: "spear_phishing",
          display_name: "Spear Phishing Campaigns",
          color: "#ffca00",
          description:
            "Targeted email attacks tailored for specific individuals.",
        },
      ],
    },
    {
      name: "network_traffic",
      display_name: "Network Traffic",
      color: "#33ff57",
      families: [
        {
          name: "DDoS",
          display_name: "DDoS Attacks",
          color: "#ff5733",
          description:
            "Network traffic designed to overwhelm and disrupt services.",
        },
        {
          name: "Botnet",
          display_name: "Botnet Activities",
          color: "#ff5733",
          description: "Emails related to botnet-controlled systems.",
        },
        {
          name: "Port_Scanning",
          display_name: "Port Scanning Attempts",
          color: "#ff5733",
          description: "Emails reporting suspicious port scanning activities.",
        },
        {
          name: "google",
          display_name: "Google Services",
          color: "#33ff57",
          description:
            "Network traffic related to Google services and websites.",
        },
        {
          name: "images",
          display_name: "Image Downloads",
          color: "#33ff57",
          description: "Emails involving the download of images.",
        },
        {
          name: "web_browsing",
          display_name: "Web Browsing Activities",
          color: "#33ff57",
          description: "Emails related to general web browsing activities.",
        },
      ],
    },
    // Add more family types and families as needed
  ];

  const getFamily = (familyName: string, familyType?: string) => {
    return familyTypes
      .find(
        (cfamilyType) =>
          cfamilyType.name === (familyType || DEFAULT_FAMILY_TYPE)
      )
      ?.families.find((family) => family.name === familyName);
  };

  const strings: TStrings = {
    familyTypes, // Define your familyTypes here
    strings: [
      {
        name: "ipv4",
        strings: extractedStrings
          .filter((string) => regexPatterns.IPV4.test(string))
          .map((string) => ({
            string,
            tags: ["ipv4"],
            family:
              getFamily("google", "network_traffic")?.name || DEFAULT_FAMILY,
            familyType: "network_traffic",
          })),
      },
      {
        name: "ipv6",
        strings: extractedStrings
          .filter((string) => regexPatterns.IPV6.test(string))
          .map((string) => ({
            string,
            tags: ["ipv6"],

            familyType: "network_traffic",
          })),
      },
      {
        name: "url",
        strings: extractedStrings
          .filter((string) => regexPatterns.URL.test(string))
          .map((string) => ({
            string,
            tags: ["url"],

            familyType: "network_traffic",
          })),
      },
      {
        name: "uuid",
        strings: extractedStrings
          .filter((string) => regexPatterns.UUID.test(string))
          .map((string) => ({
            string,
            tags: ["uuid"],
            family: getFamily("identity")?.name || DEFAULT_FAMILY,
            familyType: DEFAULT_FAMILY_TYPE,
          })),
      },
      // Add more string types if needed
    ],
  };

  return strings;
};

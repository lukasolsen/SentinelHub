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

export const extractFromURL = (url: string, regex: RegExp): string => {
  const matches = url.match(regex);
  return matches ? matches[1] : "";
};

// Define your regex patterns here
export const URL_REGEX =
  /((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))/gim;
export const IPV4_REGEX =
  /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/gm;
export const IPV4_REGEX_STRICT = /(?<!\d|\.)(?:\d{1,3}\.){3}\d{1,3}(?!\d|\.)/gm;
export const IPV6_REGEX =
  /((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\b/gim;
export const IPV6_REGEX_STRICT =
  /(?<![:.\w])(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}(?![:.\w])/gim;
export const MAC_ADDRESS_REGEX =
  /(?:[0-9A-Fa-f]{2}[:-]){5}(?:[0-9A-Fa-f]{2})/gim;
export const MAC_ADDRESS_REGEX_STRICT =
  /(?<![:.\w])(?:[A-F0-9]{2}[:-]){5}[A-F0-9]{2}(?![:.\w])/gim;
export const EMAIL_REGEX =
  /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gim;
export const EMAIL_REGEX_STRICT =
  /(?<!\w)([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)(?!\w)/gim;
export const UUID_REGEX = /(?:[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}?)/gim;
export const UUID_REGEX_STRICT =
  /(?<!\w)(?:[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}?)(?!\w)/gim;

type Data = {
  attachments: string[];
  date: string;
  from: FromType;
  headerLines: HeaderLine[];
  headers: Headers;
  html: string;
  messageId: string;
  subject: string;
  to: FromType[];
};

type Headers = {
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
  value: FromValueTypew[];
  html: string;
  text: string;
};

type FromValueTypew = {
  address: string;
  name: string;
};

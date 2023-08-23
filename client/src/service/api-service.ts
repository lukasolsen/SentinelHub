import axios from "axios";
import { getIPAddress } from "./util-service";

export const sendEmailContent = async (emailContent: string): any => {
  const api = "http://localhost:1200/email-parser";

  const ip_address = await getIPAddress();
  // we need to have Access-Control-Allow-Origin in header
  return axios
    .post(
      api,
      {
        emailContent: emailContent,
        ip_address: ip_address,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const addEmailContent = async (emailContent: string): any => {
  const api = "http://localhost:1200/email-add";

  const ip_address = await getIPAddress();

  return axios
    .post(
      api,
      {
        emailContent: emailContent,
        ip_address: ip_address,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getEmails = async (): any => {
  const api = "http://localhost:1200/get-emails";

  const ip_address = await getIPAddress();

  return axios
    .get(api)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

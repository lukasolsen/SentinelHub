import axios from "axios";
import { getIPAddress } from "./util-service";

export const sendEmailContent = async (emailContent: string): any => {
  const api = "http://localhost:1200/api/parse-email";

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
  const api = "http://localhost:1200/api/add-bad-email";

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
  const api = "http://localhost:1200/api/bad-emails";

  const ip_address = await getIPAddress();

  return axios
    .post(api)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getEmail = async (id: string): any => {
  const api = `http://localhost:1200/api/bad-email/${id}`;

  const ip_address = await getIPAddress();

  return axios
    .get(api)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}
import axios from "axios";
import { getIPAddress } from "./util-service";

type EmailContentRequest = {
  emailContent: string;
  ip_address: string;
};

type ErrorResponse = {
  error: string;
};

const makeGetRequest = async <T>(
  api: string,
  params?: Record<string, string>
): Promise<T | ErrorResponse> => {
  const ip_address = await getIPAddress();

  const headers = {
    "Content-Type": "application/json",
  };

  const queryParams = params ? { ...params, ip_address } : { ip_address };

  try {
    const response = await axios.get(api, {
      headers,
      params: queryParams,
    });
    return response.data as T;
  } catch (error) {
    return { error: error.message };
  }
};

const makePostRequest = async <T>(
  api: string,
  requestData?: EmailContentRequest | BadEmailRequest
): Promise<T | ErrorResponse> => {
  const ip_address = await getIPAddress();

  const headers = {
    "Content-Type": "application/json",
  };

  if (requestData) {
    requestData.ip_address = ip_address;
  }

  try {
    const response = await axios.post(api, requestData, { headers });
    return response.data as T;
  } catch (error) {
    return { error: error.message };
  }
};

export const sendEmailContent = async (
  emailContent: string
): Promise<ErrorResponse | VendorOutput> => {
  const api = "http://localhost:1200/api/parse-email";

  const queryParams = {
    emailContent,
  };

  return makePostRequest<VendorOutput>(api, queryParams);
};

export const addEmailContent = async (
  emailContent: string
): Promise<ErrorResponse | VendorOutput> => {
  const api = "http://localhost:1200/api/add-bad-email";

  const queryParams = {
    emailContent,
  };

  return makePostRequest<VendorOutput>(api, queryParams);
};

export const getEmails = async (): Promise<ErrorResponse | VendorOutput[]> => {
  const api = "http://localhost:1200/api/bad-emails";

  return makePostRequest<VendorOutput[]>(api);
};

export const getEmail = async (
  id: string
): Promise<ErrorResponse | IDataOutput> => {
  const api = `http://localhost:1200/api/bad-email/${id}`;

  return makeGetRequest<IDataOutput>(api);
};

export const getRelatedReports = async (
  ip: string,
  id: string,
  verdict: string
): Promise<ErrorResponse | VendorOutput[]> => {
  console.log(ip, id, verdict);
  const api = `http://localhost:1200/api/related-reports`;
  //Make the things in body
  const queryParams = {
    ip,
    id,
    verdict,
  };

  return makePostRequest<VendorOutput[]>(api, queryParams);
};

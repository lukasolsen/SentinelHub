import axios from "axios";
import { getIPAddress } from "./util-service";

type ErrorResponse = {
  error: string;
};

const getBaseUrl = (): string => {
  return "http://localhost:1200/api"; // Your base API URL
};

const makeRequest = async <T>(
  method: "GET" | "POST",
  url: string,
  token: string,
  requestData?: Record<string, any>
): Promise<T | ErrorResponse> => {
  try {
    const response = await axios.request<T>({
      method,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      url: getBaseUrl() + url,
      ...(method === "POST" ? { data: requestData } : { params: requestData }),
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const sendEmailContent = async (
  emailContent: string,
  token: string
): Promise<ErrorResponse | VendorOutput> => {
  const api = "/parse/email";
  const requestData = { emailContent };
  return makeRequest<VendorOutput>("POST", api, token, requestData);
};

export const addEmailContent = async (
  emailContent: string,
  token: string
): Promise<ErrorResponse | VendorOutput> => {
  const api = "/email/scan";
  const requestData = { emailContent };
  return makeRequest<VendorOutput>("POST", api, token, requestData);
};

export const getEmails = async (
  token: string
): Promise<ErrorResponse | VendorOutput[]> => {
  const api = "/email/get-all";
  return makeRequest<VendorOutput[]>("GET", api, token);
};

export const getEmail = async (
  id: string,
  token: string
): Promise<ErrorResponse | IDataOutput> => {
  const api = `/email/get/${id}`;
  return makeRequest<IDataOutput>("GET", api, token);
};

export const getRelatedReports = async (
  id: number,
  token: string
): Promise<ErrorResponse | VendorOutput[]> => {
  const api = `/email/get/${id}/related-samples`;
  return makeRequest<VendorOutput[]>("GET", api, token);
};

export const getVendors = async (
  id: number,
  token: string
): Promise<ErrorResponse | VendorOutput[]> => {
  const api = `/email/get/${id}/vendors`;
  return makeRequest<VendorOutput[]>("GET", api, token);
};

export const getStrings = async (
  id: number,
  token: string
): Promise<ErrorResponse | VendorOutput[]> => {
  const api = `/email/get/${id}/strings`;
  return makeRequest<VendorOutput[]>("GET", api, token);
};

export const getStatistics = async (
  token: string
): Promise<ErrorResponse | VendorOutput[]> => {
  const api = "/email/statistics";
  return makeRequest<VendorOutput[]>("GET", api, token);
};

export const searchReports = async (
  query: string,
  token: string
): Promise<ErrorResponse | VendorOutput> => {
  const api = "/email/search";

  const requestData = { queryString: query };
  return makeRequest<VendorOutput>("POST", api, token, requestData);
};

export const getUserInformation = async (
  token?: string
): Promise<ErrorResponse | VendorOutput> => {
  const ip = await getIPAddress();
  const api = "/user/me?ip=" + ip;
  return makeRequest<VendorOutput>("GET", api, token || "");
};

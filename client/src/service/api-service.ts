import axios, { AxiosRequestConfig } from "axios";
import { getIPAddress } from "./util-service";

type ErrorResponse = {
  error: string;
};

const getBaseUrl = (): string => {
  return "http://localhost:1200/api"; // Your base API URL
};

let globalIpAddress: string | null = null;

const createRequestConfig = async (): Promise<AxiosRequestConfig> => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  };

  if (!globalIpAddress) {
    globalIpAddress = await getIPAddress();
  }

  return {
    headers,
    params: { ip: globalIpAddress },
  };
};

const makeRequest = async <T>(
  method: "GET" | "POST",
  url: string,
  requestData?: Record<string, any>
): Promise<T | ErrorResponse> => {
  try {
    const token = sessionStorage.getItem("token") || "";
    const requestConfig = await createRequestConfig();
    const response = await axios.request<T>({
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      url: getBaseUrl() + url,
      ...requestConfig,
      ...(method === "POST" ? { data: requestData } : { params: requestData }),
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const sendEmailContent = async (
  emailContent: string
): Promise<ErrorResponse | VendorOutput> => {
  const api = "/parse/email";
  const requestData = { emailContent };
  return makeRequest<VendorOutput>("POST", api, requestData);
};

export const addEmailContent = async (
  emailContent: string
): Promise<ErrorResponse | VendorOutput> => {
  const api = "/email/scan";
  const requestData = { emailContent };
  return makeRequest<VendorOutput>("POST", api, requestData);
};

export const getEmails = async (): Promise<ErrorResponse | VendorOutput[]> => {
  const api = "/email/get-all";
  return makeRequest<VendorOutput[]>("GET", api);
};

export const getEmail = async (
  id: string
): Promise<ErrorResponse | IDataOutput> => {
  const api = `/email/get/${id}`;
  return makeRequest<IDataOutput>("GET", api);
};

export const getRelatedReports = async (
  id: number
): Promise<ErrorResponse | VendorOutput[]> => {
  const api = `/email/get/${id}/related-samples`;
  return makeRequest<VendorOutput[]>("GET", api);
};

export const getVendors = async (
  id: number
): Promise<ErrorResponse | VendorOutput[]> => {
  const api = `/email/get/${id}/vendors`;
  return makeRequest<VendorOutput[]>("GET", api);
};

export const getStrings = async (
  id: number
): Promise<ErrorResponse | VendorOutput[]> => {
  const api = `/email/get/${id}/strings`;
  return makeRequest<VendorOutput[]>("GET", api);
};

export const getStatistics = async (): Promise<
  ErrorResponse | VendorOutput[]
> => {
  const api = "/email/statistics";
  return makeRequest<VendorOutput[]>("GET", api);
};

export const register = async (
  email: string
): Promise<ErrorResponse | VendorOutput> => {
  const api = "/user/register";
  const requestData = { email, ip: globalIpAddress };
  sessionStorage.setItem("isLoggedIn", "true");
  return makeRequest<VendorOutput>("POST", api, requestData);
};

export const login = async (
  email: string
): Promise<ErrorResponse | VendorOutput> => {
  const api = "/user/login";

  const requestData = { email, ip: globalIpAddress };
  sessionStorage.setItem("isLoggedIn", "true");
  return makeRequest<VendorOutput>("POST", api, requestData);
};

export const searchReports = async (
  query: string
): Promise<ErrorResponse | VendorOutput> => {
  const api = "/email/search";

  const requestData = { queryString: query, ip: globalIpAddress };
  return makeRequest<VendorOutput>("POST", api, requestData);
};

export const checkLoggedIn = async (): Promise<
  ErrorResponse | VendorOutput
> => {
  //check our session storage before we check the api
  const token = sessionStorage.getItem("isLoggedIn");
  if (token) {
    return { status: "ok" };
  }

  const ip = await getIPAddress();
  const api = `/user/check-login?ip=${ip}`;
  return makeRequest<VendorOutput>("GET", api);
};

export const getUserInformation = async (): Promise<
  ErrorResponse | VendorOutput
> => {
  const ip = await getIPAddress();
  const api = "/user/me?ip=" + ip;
  return makeRequest<VendorOutput>("GET", api);
};

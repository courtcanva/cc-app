import { environment } from "@/constants/environment";
import axios from "axios";
import omit from "lodash/omit";

// // AbortController
// // Starting from v0.22.0 Axios supports AbortController to cancel requests in fetch API way:

// const controller = new AbortController();

// // cancel the request
// controller.abort()

interface IConfig {
  method: string;
  params?: string;
  requestData?: Record<string, unknown>;
  token?: string;
  headers?: { contentType: string };
}

const REQUEST_TIMEOUT = 10000;
const axiosInstance = axios.create({
  baseURL: environment.apiBaseUrl,
  timeout: REQUEST_TIMEOUT,
});

export const api = async (
  endpoint: string,
  { method, params, requestData, token, headers, ...customConfig }: IConfig
) => {
  const config = {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": headers?.contentType ? headers.contentType : "application/json",
      ...omit(headers, ["contentType"]),
    },
    params,
    data: requestData,
    ...customConfig,
  };

  const response = await axiosInstance(endpoint, { ...config });
  return response;
};

import { api } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

export interface AxiosResponse<T = object> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig<T>;
  request?: never;
}

export default function useAuthRequest() {
  const checkEmail = async (email: string) => {
    try {
      const response: AxiosResponse = await api("/user", {
        method: "post",
        requestData: { email },
      });
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return error.response;
    }
  };

  return { checkEmail };
}

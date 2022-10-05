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

  const userRegister = async (userInfo: any) => {
    try {
      const response: AxiosResponse = await api("/auth/register", {
        method: "post",
        requestData: userInfo,
      });
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return error.response;
    }
  };

  const verifyOTP = async (userId: string, otp: string) => {
    try {
      const response: AxiosResponse = await api("/auth/verifyOTP", {
        method: "post",
        requestData: { userId, otp },
      });
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return error.response;
    }
  };

  const userLogin = async (email: string, password: string) => {
    try {
      const response: AxiosResponse = await api("/auth/login", {
        method: "post",
        requestData: { email, password },
      });
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return error.response;
    }
  };

  const resendOTP = async (userId: string, email: string) => {
    try {
      const response: AxiosResponse = await api("/auth/resendOTP", {
        method: "post",
        requestData: { userId, email },
      });
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return error.response;
    }
  };

  const deleteUser = async (email: string) => {
    try {
      const response: AxiosResponse = await api("/user/delete", {
        method: "post",
        requestData: { email },
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  };

  return { checkEmail, userRegister, verifyOTP, userLogin, resendOTP, deleteUser };
}

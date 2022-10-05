import { api } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import UserTokenService from "@/components/Login/helpers/TokenService";
export interface AxiosResponse<T = object> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig<T>;
  request?: never;
}

// eslint-disable-next-line require-jsdoc
export default function useAuthRequest() {
  // avoid using any type at catch-error
  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error;
    return Object(error);
  };

  const checkEmail = async (email: string) => {
    try {
      const response: AxiosResponse = await api("/user", {
        method: "post",
        requestData: { email },
      });
      return response;
    } catch (error) {
      const err = getErrorMessage(error);
      return err.response;
    }
  };

  const userRegister = async (userInfo: any) => {
    try {
      const response: AxiosResponse = await api("/auth/register", {
        method: "post",
        requestData: userInfo,
      });
      return response;
    } catch (error) {
      const err = getErrorMessage(error);
      return err.response;
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
    } catch (error) {
      const err = getErrorMessage(error);
      return err.response;
    }
  };

  const resendOTP = async (userId: string, email: string) => {
    try {
      const response: AxiosResponse = await api("/auth/resendOTP", {
        method: "post",
        requestData: { userId, email },
      });
      return response;
    } catch (error) {
      const err = getErrorMessage(error);
      return err.response;
    }
  };

  const userLogout = async (userId: string) => {
    try {
      await api("/auth/logout", {
        method: "post",
        requestData: { userId },
      });
    } catch (error) {
      const err = getErrorMessage(error);
      return err.response;
    } finally {
      UserTokenService.removeUser();
    }
  };

  const updateToken = async () => {
    try {
      const refreshToken = UserTokenService.getLocalRefreshToken();
      const response: AxiosResponse = await api("/auth/refresh", {
        method: "post",
        token: refreshToken,
      });
      UserTokenService.setUserToken(response.data);
    } catch (error) {
      const err = getErrorMessage(error);
      if (err.response?.status === 401) {
        UserTokenService.removeUser();
      }
    }
  };
  return { checkEmail, userRegister, verifyOTP, userLogin, resendOTP, userLogout, updateToken };
}

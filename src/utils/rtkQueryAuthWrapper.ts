import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { environment } from "@/constants/environment";
import { api } from "./axios";
import TokenService from "./TokenService";
import { AxiosResponse } from "axios";

const baseQuery = fetchBaseQuery({
  baseUrl: environment.apiBaseUrl,
  prepareHeaders: (headers) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error;
  return Object(error);
};

export const baseQueryWithReauth = async (args: any, apiArg: any, extraOptions: any) => {
  let result = await baseQuery(args, apiArg, extraOptions);
  if (result?.error?.status) {
    const refreshResult: AxiosResponse = await api("/auth/refresh", {
      method: "POST",
      token: TokenService.getLocalRefreshToken(),
    });

    if (refreshResult.status === 200) {
      TokenService.setUserToken(refreshResult.data);
      result = await baseQuery(args, apiArg, extraOptions);
    } else {
      // Log out
      TokenService.removeUser();
    }
  }
  return result;
};

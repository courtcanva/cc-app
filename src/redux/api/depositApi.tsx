import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { environment } from "@/constants/environment";

export const depositApi = createApi({
  reducerPath: "deposit",
  baseQuery: fetchBaseQuery({ baseUrl: environment.apiBaseUrl }),
  tagTypes: ["deposit"],
  endpoints: (builder) => ({
    getDeposit: builder.query<any, void>({
      query: () => `/deposit`,
      providesTags: ["deposit"],
    }),
  }),
});

export const { useGetDepositQuery } = depositApi;

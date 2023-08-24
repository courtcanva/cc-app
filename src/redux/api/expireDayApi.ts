import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "@/constants/environment";

export const expireDayApi = createApi({
  reducerPath: "expireDay",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
  }),
  endpoints: (builder) => ({
    getExpireDay: builder.query({
      query: () => `/expire-day`,
    }),
  }),
});

export const { useGetExpireDayQuery } = expireDayApi;

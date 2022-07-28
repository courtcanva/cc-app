import { environment } from "@/constants/environment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const priceApi = createApi({
  reducerPath: "priceData",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
  }),
  endpoints: (builder) => ({
    getPrice: builder.query({
      query: () => `/price`,
    }),
  }),
});

export const { useGetPriceQuery } = priceApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const priceApi = createApi({
  reducerPath: "priceData",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URI,
  }),
  endpoints: (builder) => ({
    getPrice: builder.query({
      query: () => `/price`,
    }),
  }),
});

export const { useGetPriceQuery } = priceApi;

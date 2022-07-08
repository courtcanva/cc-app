import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courtsApi: any = createApi({
  reducerPath: "courtData",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URI,
  }),
  endpoints: (builder) => ({
    getCourts: builder.query({
      query: () => `/courts`,
    }),
    getCourt: builder.query({
      query: (id) => `/courts/${id}`,
    }),
  }),
});

export const { useGetCourtsQuery, useGetCourtQuery } = courtsApi;

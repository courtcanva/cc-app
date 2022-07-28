import { environment } from "@/constants/environment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courtsApi = createApi({
  reducerPath: "courtData",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
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

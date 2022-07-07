import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courtsApi: any = createApi({
  reducerPath: "courtData",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://uat.api.courtcanva.com/v1",
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

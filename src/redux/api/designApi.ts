import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const designApi = createApi({
  reducerPath: "designData",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URI,
  }),
  endpoints: (builder) => ({
    getDesignByUser: builder.query({
      query: (userId) => `/designs/${userId}`,
    }),
  }),
});

export const { useGetDesignByUserQuery } = designApi;

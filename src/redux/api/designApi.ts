import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDesign } from "@/interfaces/design";

export const designApi = createApi({
  reducerPath: "designData",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URI,
  }),
  tagTypes: ['IDesign'],
  endpoints: (builder) => ({
    getDesignByUser: builder.query({
      query: (userId) => `/designs/${userId}`,
    }),
    addDesign: builder.mutation<IDesign, Omit<IDesign, 'user_id'>>({
      query: (body) => ({
        url: 'designs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['IDesign']
    }),
  }),
});

export const { useGetDesignByUserQuery, useAddDesignMutation } = designApi;

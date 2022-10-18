import { environment } from "@/constants/environment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courtsApi = createApi({
  reducerPath: "courtData",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
  }),
  tagTypes: ["courts"],
  endpoints: (builder) => ({
    getCourts: builder.query({
      query: () => `/courts`,
      providesTags: [{ type: "courts", id: "LIST" }],
    }),

    // future feature
    // getCourt: builder.query({
    //   query: (id) => `/courts/${id}`,
    // }),
  }),
});

export const { useGetCourtsQuery } = courtsApi;

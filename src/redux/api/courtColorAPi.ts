import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courtColorApi = createApi({
    reducerPath: "courtColorData",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URI,
    }),
    endpoints: (builder) => ({
        getCourtColor: builder.query({
            query: () => `/tiles`,
        })
    }),
});

export const { useGetCourtColorQuery } = courtColorApi;

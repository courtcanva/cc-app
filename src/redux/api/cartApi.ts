import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "shoppingCart",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
  }),
  tagTypes: ["cartItems"],
  endpoints: (builder) => ({
    getItemQuantity: builder.query({
      query: (userId) => `/shopping-cart/?user_id=${userId}`,
      providesTags: ["cartItems"],
    }),
  }),
});

export const { useGetItemQuantityQuery } = cartApi;

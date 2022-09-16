import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "@/constants/environment";
export const cartApi = createApi({
  reducerPath: "shoppingCart",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
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

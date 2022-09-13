import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartAPi = createApi({
  reducerPath: "shoppingCart",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URI,
  }),
  tagTypes: ["cartItems"],
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (newCartItem: { item: ICartItem }) => ({
        url: "",
        method: "POST",
        body: newCartItem.item,
      }),
      invalidatesTags: ["cartItems"],
    }),
  }),
});

export const { useAddToCartMutation } = cartAPi;

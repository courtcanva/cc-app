import { createApi } from "@reduxjs/toolkit/query/react";
import { ICartItem } from "@/interfaces/cartItem";
import { baseQueryWithReauth } from "@/utils/rtkQueryAuthWrapper";

export const cartApi = createApi({
  reducerPath: "shoppingCart",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["cartItems"],
  endpoints: (builder) => ({
    getItemQuantity: builder.query({
      query: (userId) => `/shopping-cart?user_id=${userId}`,
      providesTags: ["cartItems"],
    }),

    addToCart: builder.mutation({
      query: (newCartItem: { item: ICartItem }) => ({
        url: "shopping-cart",
        method: "POST",
        body: newCartItem.item,
      }),
      invalidatesTags: ["cartItems"],
    }),

    deleteItemFromCart: builder.mutation({
      query: (itemId: string) => ({
        url: `/shopping-cart/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cartItems"],
    }),
  }),
});

export const { useGetItemQuantityQuery, useAddToCartMutation, useDeleteItemFromCartMutation } =
  cartApi;

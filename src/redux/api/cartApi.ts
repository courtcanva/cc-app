import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "@/constants/environment";
import { ICartItem } from "@/interfaces/cartItem";

export const cartApi = createApi({
  reducerPath: "shoppingCart",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
  }),
  tagTypes: ["cartItems"],
  endpoints: (builder) => ({
    getItemQuantity: builder.query({
      query: (userId) => `/shopping-cart?user_id=${userId}`,
      async onQueryStarted(userId, { queryFulfilled }) {
        try {
          // "onSuccess!"
          const { data } = await queryFulfilled;
          console.log("success!", data);
        } catch (err) {
          // "onError"
          console.log("error... ", err);
        }
      },
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

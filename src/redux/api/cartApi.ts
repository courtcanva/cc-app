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
  }),
});

export const { useGetItemQuantityQuery } = cartApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "@/constants/environment";
import { IOrder } from "@/interfaces/order";

export const orderApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (userId) => `/orders?user_id=${userId}`,
      providesTags: ["orders"],
    }),

    CreateOrder: builder.mutation({
      query: (newOrder: IOrder) => ({
        url: "/orders",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;

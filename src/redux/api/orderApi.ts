import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "@/constants/environment";
import { IOrder, IStripeSession } from "@/interfaces/order";

export const orderApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    getOrders: builder.query<any, string>({
      query: (userId: string) => `/orders?user_id=${userId}`,
      providesTags: [
        { type: "orders", id: "userId" },
        { type: "orders", id: "LIST" },
      ],
    }),

    getOrderById: builder.query<any, string>({
      query: (orderId: string) => `/orders/${orderId}`,
      providesTags: ["orders"],
    }),

    createOrder: builder.mutation<any, IOrder>({
      query: (newOrder) => ({
        url: "/orders",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: [{ type: "orders", id: "LIST" }],
    }),
    deleteOrder: builder.mutation<any, string>({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "orders", id: "LIST" }],
    }),
    createStripeSession: builder.mutation<any, IStripeSession>({
      query: (newSession) => ({
        url: "/stripe/create-checkout-session",
        method: "POST",
        body: newSession,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useCreateStripeSessionMutation,
  useLazyGetOrderByIdQuery,
} = orderApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "@/constants/environment";
import { IOrder, IStripeSession } from "@/interfaces/order";

export const orderApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3500",
    baseUrl: environment.apiBaseUrl,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    getOrders: builder.query<any, string>({
      query: (userId) => `/orders?user_id=${userId}`,
      providesTags: [{ type: "orders", id: "userId" }],
    }),

    getOrderById: builder.query<any, string>({
      query: (orderId) => `/orders/${orderId}`,
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
  useCreateStripeSessionMutation,
  useLazyGetOrderByIdQuery,
} = orderApi;

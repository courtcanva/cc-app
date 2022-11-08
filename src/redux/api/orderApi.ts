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
      query: (userId) => `/orders?user_id=${userId}`,
      providesTags: ["orders"],
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
      invalidatesTags: ["orders"],
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

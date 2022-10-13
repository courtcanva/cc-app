import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "@/constants/environment";
import { ICartItem } from "@/interfaces/cartItem";

export const templateApi = createApi({
  reducerPath: "templates",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
  }),
  tagTypes: ["templates", "template"],
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: (userId) => `/templates?user_id=${userId}`,
      providesTags: ["templates", "template"],
    }),

    getTemplateById: builder.query({
      query: (templateId) => `templates/${templateId}`,
      providesTags: ["templates", "template"],
    }),

    addTemplate: builder.mutation({
      query: (newTemplate: ICartItem) => ({
        url: "templates",
        method: "POST",
        body: newTemplate,
      }),
      invalidatesTags: () => [{ type: "templates" }],
    }),

    deleteTemplate: builder.mutation({
      query: (itemId: string) => ({
        url: `/templates/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "templates" }],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateByIdQuery,
  useAddTemplateMutation,
  useDeleteTemplateMutation,
} = templateApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "@/constants/environment";
import { ITemplate } from "@/interfaces/template";

export const templateApi = createApi({
  reducerPath: "templates",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
  }),
  tagTypes: ["templates"],
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: (userId) => `/templates?user_id=${userId}`,
      providesTags: ["templates"],
    }),

    getTemplateById: builder.query({
      query: (templateId) => `templates/${templateId}`,
      providesTags: ["templates"],
    }),

    addTemplate: builder.mutation({
      query: (newTemplate: ITemplate) => ({
        url: "templates",
        method: "POST",
        body: newTemplate,
      }),
      invalidatesTags: ["templates"],
    }),

    deleteTemplate: builder.mutation({
      query: (itemId: string) => ({
        url: `/templates/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["templates"],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateByIdQuery,
  useAddTemplateMutation,
  useDeleteTemplateMutation,
} = templateApi;

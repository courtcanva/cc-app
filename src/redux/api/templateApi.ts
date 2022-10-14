import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "@/constants/environment";
import { ITemplate } from "@/interfaces/template";

export const templateApi = createApi({
  reducerPath: "templates",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
  }),
  tagTypes: ["template"],
  endpoints: (builder) => ({
    getTemplates: builder.query<any[], string>({
      query: (userId) => `/templates?user_id=${userId}`,
      providesTags: (result, err, arg) =>
        result
          ? [...result.map(({ _id }) => ({ type: "template" as const, id: _id })), "template"]
          : ["template"],
    }),

    getTemplateById: builder.query<any, string>({
      query: (templateId) => `templates/${templateId}`,
      providesTags: (result, err, arg) =>
        result
          ? [{ type: "template" as const, id: result._id }]
          : ["template"],
    }),

    addTemplate: builder.mutation<any, Omit<ITemplate, "_id">>({
      query: (newTemplate) => ({
        url: "templates",
        method: "POST",
        body: newTemplate,
      }),
      invalidatesTags: ["template"],
    }),

    deleteTemplate: builder.mutation<boolean, string>({
      query: (templateId) => ({
        url: `/templates/${templateId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [{ type: "template", id: arg }],
    }),

    updateTemplate: builder.mutation<any, Partial<ITemplate> & Pick<ITemplate, "_id">>({
      query: (templateid) => ({
        url: `/templates/${templateid}`,
        method: "PUT",
      }),
      invalidatesTags: (result, err, arg) => [{ type: "template", id: arg._id }],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateByIdQuery,
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
} = templateApi;

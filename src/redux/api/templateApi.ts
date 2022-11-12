import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "@/constants/environment";
import { ITemplate, ITemplateDataDb, ITemplateObj, ITemplateLists } from "@/interfaces/template";
import _ from "lodash";

export const templateApi = createApi({
  reducerPath: "templates",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiBaseUrl,
  }),
  tagTypes: ["template"],
  endpoints: (builder) => ({
    getTemplates: builder.query<ITemplateObj<ITemplateLists>, string | void>({
      query: (userId) => (userId ? `/templates?user_id=${userId}` : `/templates`),
      // transformResponse: (result: ITemplateObj<ITemplateLists>, _meta, _arg) => {
      //   return result.data.map((item) => _.omit(item, ["__v", "isDeleted"]));
      // },
      providesTags: (result, _err, _arg) =>
        result
          ? [...result.data.map(({ _id }) => ({ type: "template" as const, id: _id })), "template"]
          : ["template"],
    }),

    getTemplateLists: builder.query<
      ITemplateObj<ITemplateLists>,
      { offset: number | void; limit: number | void; filterTag: string | void }
    >({
      query: ({ offset = 0, limit = 10, filterTag = "" }) =>
        `/templates?offset=${offset}&limit=${limit}&filterTag=${filterTag}`,
      // transformResponse: (result: ITemplateObj<ITemplateLists>, _meta, _arg) => {
      //   return result.data.map((item) => _.omit(item, ["__v", "isDeleted"]));
      // },
      providesTags: (result, _err, _arg) =>
        result
          ? [...result.data.map(({ _id }) => ({ type: "template" as const, id: _id })), "template"]
          : ["template"],
    }),

    getTemplateById: builder.query<Omit<ITemplateDataDb, "__v" | "isDeleted">, string>({
      query: (templateId) => `templates/${templateId}`,
      transformResponse: (result: ITemplateDataDb, _meta, _arg) => {
        return _.omit(result, ["__v", "isDeleted"]);
      },
      providesTags: (result, _err, _arg) =>
        result ? [{ type: "template", id: result._id }] : ["template"],
    }),

    addTemplate: builder.mutation<ITemplateDataDb, Omit<ITemplate, "_id">>({
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
      invalidatesTags: (_result, _err, arg) => [{ type: "template", id: arg }],
    }),

    updateTemplate: builder.mutation<ITemplateDataDb, Partial<ITemplate> & Pick<ITemplate, "_id">>({
      query: (template) => ({
        url: `/templates/${template._id}`,
        method: "PUT",
        body: template,
      }),
      invalidatesTags: (_result, _err, arg) => [{ type: "template", id: arg._id }],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateListsQuery,
  useLazyGetTemplateListsQuery,
  useGetTemplateByIdQuery,
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
} = templateApi;

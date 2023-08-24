import { createApi } from "@reduxjs/toolkit/query/react";
import { ISaveDesign } from "@/interfaces/design";
import { baseQueryWithReauth } from "@/utils/rtkQueryAuthWrapper";
import { api } from "@/utils/axios";
import TokenService from "@/utils/TokenService";

export const fetchDesignData = async (userId: string) => {
  const design = await api(process.env.NEXT_PUBLIC_API_BASE_URI + `/designs/` + userId, {
    method: "GET",
    token: TokenService.getLocalAccessToken(),
  });
  return design;
};

export const designApi = createApi({
  reducerPath: "designData",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Design"],
  endpoints: (builder) => ({
    getDesign: builder.query({
      query: (userId: string) => `/designs/${userId}`,
    }),

    addDesign: builder.mutation({
      query: (newDesign: { design: ISaveDesign }) => ({
        url: "designs",
        method: "POST",
        body: newDesign.design,
      }),
      invalidatesTags: ["Design"],
    }),
    updateDesign: builder.mutation({
      query: (changeDesign: { _id: string; design: ISaveDesign }) => ({
        url: `/designs/${changeDesign._id}`,
        method: "PUT",
        body: changeDesign.design,
      }),
      invalidatesTags: ["Design"],
    }),
    deleteDesign: builder.mutation({
      query: (_id: string) => ({
        url: `/designs/${_id}`,
        method: "DELETE",
        body: _id,
      }),
      invalidatesTags: ["Design"],
    }),
  }),
});

export const {
  useGetDesignQuery,
  useAddDesignMutation,
  useUpdateDesignMutation,
  useDeleteDesignMutation,
} = designApi;

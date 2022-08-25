import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISaveDesign, IDesign } from "@/interfaces/design";
import axios from "axios";

export const fetchDesignData = (userId: string) => {
  const design = axios.get(process.env.NEXT_PUBLIC_API_BASE_URI + `/designs/` + userId);
  return design;
};

export const updateDesignData = (_id:string, design: ISaveDesign) => {
  const res = axios.put(process.env.NEXT_PUBLIC_API_BASE_URI + `/designs/` + _id, { user_id: design.user_id,
    designName: design.designName,
    tileColor: design.tileColor,
    courtSize: design.courtSize });
  return res;
};

export const designApi = createApi({
  reducerPath: "designData",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URI,
  }),
  tagTypes: ['Design'],
  endpoints: (builder) => ({
    getDesign: builder.query({
      query: (userId:string) => `/designs/${userId}`,
    }),
    addDesign: builder.mutation({
      query: ( newDesign: { design: ISaveDesign }) => ({
        url: 'designs',
        method: 'POST',
        body: newDesign.design
      }),
      invalidatesTags: ['Design']
    }),
    updateDesign: builder.mutation({
      query: (changeDesign: { _id:string, design: ISaveDesign }) => ({
          url: `/designs/${ changeDesign._id}`,
          method: 'PUT',
          body: changeDesign.design
      }),
      invalidatesTags: ['Design']
    }),
    deleteDesign: builder.mutation({
        query: ( _id: string ) => ({
            url: `/designs/${ _id }`,
            method: 'DELETE',
            body: _id
        }),
        invalidatesTags: ['Design']
    }),
  }),
});

export const { useGetDesignQuery, useAddDesignMutation, useUpdateDesignMutation, useDeleteDesignMutation } = designApi;

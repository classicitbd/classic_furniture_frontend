import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const sub_categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get Sub_Category

    getSub_Category: build.query({
      query: () => ({
        url: `/sub_category`,
        method: "GET",
        headers: {
        authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["sub_category"],
    }),

    //add Sub_Category
    addSub_Category: build.mutation({
      query: (data) => ({
        url: `/sub_category`,
        method: "POST",
        headers: {
        authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['sub_category'],
    }),

    //update Sub_Category
    updateSub_Category: build.mutation({
        query: (data) => ({
          url: `/sub_category`,
          method: "PATCH",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['sub_category'],
      }),

    //delete Sub_Category
    deleteSub_Category: build.mutation({
        query: (data) => ({
          url: `/sub_category`,
          method: "DELETE",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['sub_category'],
      }),

  }),
});

export const { useGetSub_CategoryQuery , useAddSub_CategoryMutation, useDeleteSub_CategoryMutation, useUpdateSub_CategoryMutation } =
  sub_categoryApi;
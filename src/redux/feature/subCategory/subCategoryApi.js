import { api } from "../../api/apiSlice";

export const sub_categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    //add Sub_Category
    addSub_Category: build.mutation({
      query: (data) => ({
        url: `/sub_category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['sub_category'],
    }),

    //update Sub_Category
    updateSub_Category: build.mutation({
        query: (data) => ({
          url: `/sub_category`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ['sub_category'],
      }),

    //delete Sub_Category
    deleteSub_Category: build.mutation({
        query: (data) => ({
          url: `/sub_category`,
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ['sub_category'],
      }),

  }),
});

export const { useAddSub_CategoryMutation, useDeleteSub_CategoryMutation, useUpdateSub_CategoryMutation } =
  sub_categoryApi;
import { api } from "../../api/apiSlice";

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    //add Category
    addCategory: build.mutation({
      query: (data) => ({
        url: `/category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['category'],
    }),

    //update Category
    updateCategory: build.mutation({
        query: (data) => ({
          url: `/category`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ['category'],
      }),

    //delete Category
    deleteCategory: build.mutation({
        query: (data) => ({
          url: `/category`,
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ['category'],
      }),

  }),
});

export const { useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } =
  categoryApi;
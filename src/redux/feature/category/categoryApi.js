import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    //add Category
    addCategory: build.mutation({
      query: (data) => ({
        url: `/category`,
        method: "POST",
        headers: {
        authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['category'],
    }),

    //update Category
    updateCategory: build.mutation({
        query: (data) => ({
          url: `/category`,
          method: "PATCH",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['category'],
      }),

    //delete Category
    deleteCategory: build.mutation({
        query: (data) => ({
          url: `/category`,
          method: "DELETE",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['category'],
      }),

  }),
});

export const { useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } =
  categoryApi;
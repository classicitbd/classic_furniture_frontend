import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({

    // get Category

    getCategory: build.query({
      query: () => ({
        url: `/category`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["category"],
    }),

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

export const { useGetCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } =
  categoryApi;
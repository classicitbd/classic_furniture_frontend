import { api } from "../../api/apiSlice";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({

    //add Product
    addProduct: build.mutation({
      query: (data) => ({
        url: `/product`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['product'],
    }),

    //delete Product
    deleteProduct: build.mutation({
        query: (data) => ({
          url: `/product`,
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ['product'],
      }),

      //update Product
    updateProduct: build.mutation({
        query: (data) => ({
          url: `/product`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ['product'],
      }),

  }),
});

export const { useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation } =
  productApi;
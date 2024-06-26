import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get Product

    getProduct: build.query({
      query: () => ({
        url: `/product`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    //add Product
    addProduct: build.mutation({
      query: (data) => ({
        url: `/product`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    //delete Product
    deleteProduct: build.mutation({
      query: (data) => ({
        url: `/product`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    //update Product
    updateProduct: build.mutation({
      query: (data) => ({
        url: `/product`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;

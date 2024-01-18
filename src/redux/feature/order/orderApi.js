import { api } from "../../api/apiSlice";

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    //delete Order
    deleteOrder: build.mutation({
        query: (data) => ({
          url: `/order`,
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ['order'],
      }),

    //update Order
    updateOrder: build.mutation({
        query: (data) => ({
          url: `/order`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ['order'],
      }),
  }),
});

export const { useDeleteOrderMutation, useUpdateOrderMutation } = orderApi;
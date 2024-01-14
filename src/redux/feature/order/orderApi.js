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
  }),
});

export const { useDeleteOrderMutation } = orderApi;
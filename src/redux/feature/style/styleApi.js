import { api } from "../../api/apiSlice";

export const styleApi = api.injectEndpoints({
  endpoints: (build) => ({

    //add Style
    addStyle: build.mutation({
      query: (data) => ({
        url: `/style`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['style'],
    }),

    //delete Style
    deleteStyle: build.mutation({
        query: (data) => ({
          url: `/style`,
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ['style'],
      }),

  }),
});

export const { useAddStyleMutation, useDeleteStyleMutation } =
  styleApi;
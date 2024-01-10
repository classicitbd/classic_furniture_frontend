import { api } from "../../api/apiSlice";

export const colorApi = api.injectEndpoints({
  endpoints: (build) => ({

    //add Color
    addColor: build.mutation({
      query: (data) => ({
        url: `/color`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['color'],
    }),

    //update Color
    updateColor: build.mutation({
        query: (data) => ({
          url: `/color`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ['color'],
      }),

    //delete Color
    deleteColor: build.mutation({
        query: (data) => ({
          url: `/color`,
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ['color'],
      }),

  }),
});

export const { useAddColorMutation, useDeleteColorMutation, useUpdateColorMutation } =
  colorApi;
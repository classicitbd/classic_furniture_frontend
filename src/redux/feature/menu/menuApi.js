import { api } from "../../api/apiSlice";

export const menuApi = api.injectEndpoints({
  endpoints: (build) => ({
    //add menu
    addMenu: build.mutation({
      query: (data) => ({
        url: `/menu`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['menu'],
    }),
//delete menu
    deleteMenu: build.mutation({
        query: (data) => ({
          url: `/menu`,
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ['menu'],
      }),

  }),
});

export const { useAddMenuMutation, useDeleteMenuMutation } =
  menuApi;
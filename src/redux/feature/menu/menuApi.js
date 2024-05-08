import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const menuApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get menu

    getMenu: build.query({
      query: () => ({
        url: `/category/banner_match_category`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["menu"],
    }),
    //add menu
    addMenu: build.mutation({
      query: (data) => ({
        url: `/menu`,
        method: "POST",
        headers: {
        authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['menu'],
    }),

    //update menu
    updateMenu: build.mutation({
        query: (data) => ({
          url: `/menu`,
          method: "PATCH",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['menu'],
      }),

//delete menu
    deleteMenu: build.mutation({
        query: (data) => ({
          url: `/menu`,
          method: "DELETE",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['menu'],
      }),

  }),
});

export const { useGetMenuQuery, useAddMenuMutation, useDeleteMenuMutation, useUpdateMenuMutation } =
  menuApi;
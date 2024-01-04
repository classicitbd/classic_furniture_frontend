import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";

const MENU_URL = "/menu";

export const menuApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add menu
    addMenu: build.mutation({
      query: (data) => ({
        url: `${MENU_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.menu],
    }),
//get menu
    getMenu: build.query({
        query: () => ({
            url: `${MENU_URL}`,
            providesTags: [tagTypes.menu],
          }),
    }),
//delete menu
    deleteMenu: build.mutation({
        query: (data) => ({
          url: `${MENU_URL}`,
          method: "DELETE",
          data: data,
        }),
        invalidatesTags: [tagTypes.menu],
      }),

  }),
});

export const { useAddMenuMutation, useDeleteMenuMutation, useGetMenuQuery } =
  menuApi;

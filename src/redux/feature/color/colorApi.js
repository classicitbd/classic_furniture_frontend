import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const colorApi = api.injectEndpoints({
  endpoints: (build) => ({

    //add Color
    addColor: build.mutation({
      query: (data) => ({
        url: `/color`,
        method: "POST",
        headers: {
        authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['color'],
    }),

    //update Color
    updateColor: build.mutation({
        query: (data) => ({
          url: `/color`,
          method: "PATCH",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['color'],
      }),

    //delete Color
    deleteColor: build.mutation({
        query: (data) => ({
          url: `/color`,
          method: "DELETE",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['color'],
      }),

  }),
});

export const { useAddColorMutation, useDeleteColorMutation, useUpdateColorMutation } =
  colorApi;
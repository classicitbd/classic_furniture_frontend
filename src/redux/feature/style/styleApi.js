import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const styleApi = api.injectEndpoints({
  endpoints: (build) => ({

    //add Style
    addStyle: build.mutation({
      query: (data) => ({
        url: `/style`,
        method: "POST",
        headers: {
        authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['style'],
    }),

    //delete Style
    deleteStyle: build.mutation({
        query: (data) => ({
          url: `/style`,
          method: "DELETE",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['style'],
      }),

      //update Style
    updateStyle: build.mutation({
        query: (data) => ({
          url: `/style`,
          method: "PATCH",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['style'],
      }),

  }),
});

export const { useAddStyleMutation, useDeleteStyleMutation, useUpdateStyleMutation } =
  styleApi;
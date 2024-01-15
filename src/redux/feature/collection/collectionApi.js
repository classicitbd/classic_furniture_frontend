import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const collectionApi = api.injectEndpoints({
  endpoints: (build) => ({

    //add Collection
    addCollection: build.mutation({
      query: (data) => ({
        url: `/collection`,
        method: "POST",
        headers: {
        authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['collection'],
    }),

    //update Collection
    updateCollection: build.mutation({
        query: (data) => ({
          url: `/collection`,
          method: "PATCH",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['collection'],
      }),

    //delete Collection
    deleteCollection: build.mutation({
        query: (data) => ({
          url: `/collection`,
          method: "DELETE",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['collection'],
      }),

  }),
});

export const { useAddCollectionMutation, useDeleteCollectionMutation, useUpdateCollectionMutation } =
  collectionApi;
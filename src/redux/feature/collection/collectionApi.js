import { api } from "../../api/apiSlice";

export const collectionApi = api.injectEndpoints({
  endpoints: (build) => ({

    //add Collection
    addCollection: build.mutation({
      query: (data) => ({
        url: `/collection`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['collection'],
    }),

    //update Collection
    updateCollection: build.mutation({
        query: (data) => ({
          url: `/collection`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ['collection'],
      }),

    //delete Collection
    deleteCollection: build.mutation({
        query: (data) => ({
          url: `/collection`,
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ['collection'],
      }),

  }),
});

export const { useAddCollectionMutation, useDeleteCollectionMutation, useUpdateCollectionMutation } =
  collectionApi;
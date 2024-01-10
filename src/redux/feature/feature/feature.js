import { api } from "../../api/apiSlice";

export const featureApi = api.injectEndpoints({
  endpoints: (build) => ({

    //add Feature
    addFeature: build.mutation({
      query: (data) => ({
        url: `/feature`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['feature'],
    }),

    //delete Feature
    deleteFeature: build.mutation({
        query: (data) => ({
          url: `/feature`,
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ['feature'],
      }),

      //update Feature
    updateFeature: build.mutation({
        query: (data) => ({
          url: `/feature`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ['feature'],
      }),

  }),
});

export const { useAddFeatureMutation, useDeleteFeatureMutation, useUpdateFeatureMutation } =
  featureApi;
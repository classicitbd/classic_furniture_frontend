import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const featureApi = api.injectEndpoints({
  endpoints: (build) => ({

    //add Feature
    addFeature: build.mutation({
      query: (data) => ({
        url: `/feature`,
        method: "POST",
        headers: {
        authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['feature'],
    }),

    //delete Feature
    deleteFeature: build.mutation({
        query: (data) => ({
          url: `/feature`,
          method: "DELETE",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['feature'],
      }),

      //update Feature
    updateFeature: build.mutation({
        query: (data) => ({
          url: `/feature`,
          method: "PATCH",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['feature'],
      }),

  }),
});

export const { useAddFeatureMutation, useDeleteFeatureMutation, useUpdateFeatureMutation } =
  featureApi;
import { api } from "../../api/apiSlice";
import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";

const token = getCookie(authKey);

export const bannerApi = api.injectEndpoints({
  endpoints: (build) => ({
    //  get banner
    getBanner: build.query({
      query: () => ({
        url: `/banner`,
        method: "GET",
      }),
      providesTags: ["banner"],
    }),
    //add banner
    addBanner: build.mutation({
      query: (data) => ({
        url: `/banner`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),

    //delete Banner
    deleteBanner: build.mutation({
      query: (data) => ({
        url: `/banner`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),

    //update Banner
    updateBanner: build.mutation({
      query: (data) => ({
        url: `/banner`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetBannerQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
} = bannerApi;

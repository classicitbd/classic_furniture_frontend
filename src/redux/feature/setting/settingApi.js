import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const seetingApi = api.injectEndpoints({
  
  endpoints: (build) => ({
    //add setting
    addSiteSetting: build.mutation({
      query: (data) => ({
        url: `/siteSetting`,
        method: "PATCH",
        headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['siteSetting'],
      })

  }),
});

export const { useAddSiteSettingMutation } = seetingApi;
import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const videoApi = api.injectEndpoints({
  endpoints: (build) => ({
    //add Video
    addVideo: build.mutation({
      query: (data) => ({
        url: `/video_tab`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["video"],
    }),
    //delete Video
    deleteVideo: build.mutation({
      query: (data) => ({
        url: `/video_tab`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["video"],
    }),
  }),
});

export const { useAddVideoMutation, useDeleteVideoMutation } = videoApi;

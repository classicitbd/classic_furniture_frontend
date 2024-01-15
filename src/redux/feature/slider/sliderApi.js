import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const sliderApi = api.injectEndpoints({
  
  endpoints: (build) => ({

    addSlider: build.mutation({
      query: (data) => ({
        url: `/slider`,
        method: "POST",
        headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['slider'],
      }),
 

    //delete Slider
    deleteSlider: build.mutation({
        query: (data) => ({
            url: `/slider`,
          method: "DELETE",
          headers: {
          authorization: `Bearer ${token}`,
          },
          body: data,
          
        }),
        invalidatesTags: ['slider'],
      }),

      //update Slider
    updateSlider: build.mutation({
        query: (data) => ({
          url: `/slider`,
          method: "PATCH",
          headers: {
        authorization: `Bearer ${token}`,
        },
          body: data,
        }),
        invalidatesTags: ['slider'],
      }),

  }),
});

export const { useAddSliderMutation, useDeleteSliderMutation, useUpdateSliderMutation } =
  sliderApi;
import { api } from "../../api/apiSlice";

export const sliderApi = api.injectEndpoints({
  endpoints: (build) => ({

    //add Slider
    addSlider: build.mutation({
      query: (data) => ({
        url: `/slider`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['slider'],
    }),

    //delete Slider
    deleteSlider: build.mutation({
        query: (data) => ({
          url: `/slider`,
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ['slider'],
      }),

      //update Slider
    updateSlider: build.mutation({
        query: (data) => ({
          url: `/slider`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ['slider'],
      }),

  }),
});

export const { useAddSliderMutation, useDeleteSliderMutation, useUpdateSliderMutation } =
  sliderApi;
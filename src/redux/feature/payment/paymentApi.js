import { api } from "../../api/apiSlice";
import { tagTypes } from "../../tag-types";

const ORDER_URL = "/order";

export const paymentApi = api.injectEndpoints({
  endpoints: (build) => ({
    //user signup
    order: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useOrderMutation } = paymentApi;

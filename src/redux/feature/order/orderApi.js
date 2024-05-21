import { authKey } from "../../../constants/storageKey";
import { getCookie } from "../../../utils/cookie-storage";
import { api } from "../../api/apiSlice";

const token = getCookie(authKey);

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    // order status update for this route
    orderStatusUpdate: build.mutation({
      query: (data) => ({
        url: `/order`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    // order type update for this route
    orderTypeUpdate: build.mutation({
      query: (data) => ({
        url: `/order/update_order_type`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    //delete Order
    deleteOrder: build.mutation({
      query: (data) => ({
        url: `/order`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    // order tracking for get specific order
    orderTracking: build.mutation({
      query: (data) => ({
        url: `/order/order_tracking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    //update Order
    updateOrder: build.mutation({
      query: (data) => ({
        url: `/order`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const { useDeleteOrderMutation, useUpdateOrderMutation, useOrderStatusUpdateMutation, useOrderTypeUpdateMutation, useOrderTrackingMutation } = orderApi;
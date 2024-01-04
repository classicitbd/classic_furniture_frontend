import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";

const AUTH_URL = "/userReg";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //user signup
    signUp: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //user otp verify
    otpVerify: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/otpVerify`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //get refeshToken
    refeshToken: build.mutation({
      query: () => ({
        url: `${AUTH_URL}/refesh_token`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //get refeshToken
    changePassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/change-password/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useSignUpMutation, useOtpVerifyMutation } = authApi;

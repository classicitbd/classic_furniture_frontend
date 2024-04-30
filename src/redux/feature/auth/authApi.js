import { api } from "../../api/apiSlice";
import { tagTypes } from "../../tag-types";

const AUTH_URL = "/userReg";
const AUTH_LOGIN = "/userlogin";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    //user signup
    signUp: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //user otp verify
    otpVerify: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //user otp verify
    resendOtp: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/resend_otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //user signin
    signIn: build.mutation({
      query: (data) => ({
        url: `${AUTH_LOGIN}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //for got password
    forgetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_LOGIN}/forgetPassword`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //set password
    setPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_LOGIN}/setNewPassword`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //set password
    updateUser: build.mutation({
      query: (data) => ({
        url: `/getMe`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //get refeshToken
    orderRegUser: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/orderRegUser`,
        method: "POST",
        body: data,
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

    // change password
    changePassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_LOGIN}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    // delete a user
    deleteUser: build.mutation({
      query: (data) => ({
        url: `/userReg`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useSignUpMutation,
  useOtpVerifyMutation,
  useSignInMutation,
  useResendOtpMutation,
  useForgetPasswordMutation,
  useSetPasswordMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useOrderRegUserMutation,
} = authApi;

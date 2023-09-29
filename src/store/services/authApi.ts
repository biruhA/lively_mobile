// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: authUrl,
  endpoints: build => ({
    login: build.mutation({
      query: ({password, phone}) => ({
        url: 'login',
        method: 'POST',
        body: {
          password,
          phone,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }),
    }),
    logout: build.mutation({
      query: token => ({
        url: 'logout',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      }),
    }),
    register: build.mutation({
      query: ({name, phone, appKey}) => ({
        url: 'register',
        method: 'POST',
        body: {
          name,
          phone,
          appKey,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }),
    }),
    verifyOtp: build.mutation({
      query: ({phone, otp}) => ({
        url: 'verify-otp',
        method: 'POST',
        body: {
          phone,
          otp,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }),
    }),
    resendOtp: build.mutation({
      query: phone => ({
        url: 'resend-otp',
        method: 'POST',
        body: {
          phone,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }),
    }),
    finishRegister: build.mutation({
      query: ({password, confirm_password, email, gender, dob, token}) => ({
        url: 'finish-register',
        method: 'POST',
        body: {
          password,
          confirm_password,
          email,
          gender,
          dob,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteAccount: build.mutation({
      query: token => ({
        url: 'delete-account',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    resetPassword: build.mutation({
      query: ({phone, appKey}) => ({
        url: 'reset-password',
        method: 'POST',
        body: {
          phone,
          appKey,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }),
    }),
    createNewPassword: build.mutation({
      query: ({new_password, confirm_new_password, token}) => ({
        url: 'create-new-password',
        method: 'POST',
        body: {
          new_password,
          confirm_new_password,
        },
        headers: {
          authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      }),
    }),
    updateProfile: build.mutation({
      query: ({name, email, gender, token}) => ({
        url: 'update-profile',
        method: 'POST',
        body: {
          name,
          email,
          gender,
        },
        headers: {
          authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      }),
    }),
    changePassword: build.mutation({
      query: ({
        current_password,
        new_password,
        confirm_new_password,
        token,
      }) => ({
        url: 'change-password',
        method: 'POST',
        body: {
          current_password,
          new_password,
          confirm_new_password,
        },
        headers: {
          authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      }),
    }),
    fcmToken: build.mutation({
      query: ({token, userToken}) => ({
        url: 'fcm-token',
        method: 'PATCH',
        body: {token},
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userToken}`,
          accept: 'application/json',
        },
      }),
    }),
    profile: build.query({
      query: token => ({
        url: 'profile',
        headers: {
          authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useFinishRegisterMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
  useUpdateProfileMutation,
  useCreateNewPasswordMutation,
  useFcmTokenMutation,
  useProfileQuery,
} = authApi;

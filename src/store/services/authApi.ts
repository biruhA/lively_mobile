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
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useFinishRegisterMutation,
  useResetPasswordMutation,
  useCreateNewPasswordMutation,
} = authApi;

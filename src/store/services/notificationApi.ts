// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: authUrl,
  endpoints: build => ({
    getMedicineNotification: build.query({
      query: token => ({
        url: 'get-medicine-notification',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    notifications: build.query({
      query: token => ({
        url: 'notifications',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {useNotificationsQuery, useGetMedicineNotificationQuery} =
  notificationApi;

// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

export const settingApi = createApi({
  reducerPath: 'settingApi',
  baseQuery: authUrl,
  endpoints: build => ({
    getFaqs: build.query({
      query: () => ({
        url: 'get-faqs',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }),
    }),
    help: build.mutation({
      query: ({subject, body, token}) => ({
        url: 'help',
        method: 'POST',
        body: {
          subject,
          body,
        },
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }),
    }),
  }),
});

export const {useGetFaqsQuery, useHelpMutation} = settingApi;

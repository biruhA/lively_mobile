// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: authUrl,
  endpoints: build => ({
    stores: build.query({
      query: ({id, latitude, longitude}) => ({
        url: `stores/${id}`,
        params: {
          latitude,
          longitude,
        },
      }),
    }),
    recommendedProductStores: build.mutation({
      query: ({id, latitude, longitude}) => ({
        url: `recommended-stores/${id}`,
        method: 'GET',
        params: {
          latitude,
          longitude,
        },
      }),
    }),
    notifyStore: build.mutation({
      query: ({id, token}) => ({
        url: `notify-store/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      }),
    }),
    clickSocial: build.mutation({
      query: ({url, id, token}) => ({
        url: `${url}/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      }),
    }),
    storeDetailById: build.query({
      query: ({id, latitude, longitude, token}) => ({
        url: `store-detail/${id}`,
        params: {
          latitude,
          longitude,
        },
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useStoresQuery,
  useRecommendedProductStoresMutation,
  useNotifyStoreMutation,
  useClickSocialMutation,
  useStoreDetailByIdQuery,
} = storeApi;

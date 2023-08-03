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
    recommendedStores: build.query({
      query: ({id, latitude, longitude}) => ({
        url: `recommended-stores/${id}`,
        params: {
          latitude,
          longitude,
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
  useRecommendedStoresQuery,
  useStoreDetailByIdQuery,
} = storeApi;

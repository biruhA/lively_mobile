// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

export const placeApi = createApi({
  reducerPath: 'placeApi',
  baseQuery: authUrl,
  endpoints: build => ({
    banners: build.query({
      query: () => ({
        url: 'banners',
      }),
    }),
    recommendedStores: build.mutation({
      query: ({latitude, longitude, is_pharmacy, search, page}) => ({
        url: 'places',
        params: {
          latitude,
          longitude,
          is_pharmacy,
          search,
          page,
        },
      }),
    }),
    rate: build.mutation({
      query: ({store_branch_id, rating, review, token}) => ({
        url: 'rate',
        method: 'POST',
        body: {
          store_branch_id,
          rating,
          review,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    placeDetail: build.query({
      query: ({id, latitude, longitude, token}) => ({
        url: `place-detail/${id}`,
        params: {
          latitude,
          longitude,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useBannersQuery,
  useRecommendedStoresMutation,
  useRateMutation,
  usePlaceDetailQuery,
} = placeApi;

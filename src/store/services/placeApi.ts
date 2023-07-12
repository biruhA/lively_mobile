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
      query: ({latitude, longitude, is_pharmacy, search}) => ({
        url: 'places',
        params: {
          latitude,
          longitude,
          is_pharmacy,
          search,
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
  usePlaceDetailQuery,
} = placeApi;

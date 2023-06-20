import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

export const filterApi = createApi({
  reducerPath: 'filterApi',
  baseQuery: authUrl,
  endpoints: build => ({
    filterCount: build.query({
      query: id => ({
        url: `filter-count/${id}`,
      }),
    }),
    applyFilter: build.mutation({
      query: ({
        brandIds,
        discount_min,
        discount_max,
        price_min,
        price_max,
        distance_min,
        distance_max,
      }) => ({
        url: 'filter',
        method: 'POST',
        body: {
          brandIds,
          discount_min,
          discount_max,
          price_min,
          price_max,
          distance_min,
          distance_max,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {useFilterCountQuery, useApplyFilterMutation} = filterApi;

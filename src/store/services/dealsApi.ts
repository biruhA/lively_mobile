// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

// Define a service using a base URL and expected endpoints
export const dealsApi = createApi({
  reducerPath: 'dealsApi',
  baseQuery: authUrl,
  endpoints: build => ({
    deals: build.query({
      query: () => ({
        url: 'deals',
      }),
    }),
    allDeals: build.query({
      query: () => ({
        url: 'all-deals',
      }),
    }),
    landscapeDiscountBanners: build.query({
      query: () => ({
        url: 'landscape-discount-banners',
      }),
    }),
    squareDiscountBanners: build.query({
      query: () => ({
        url: 'square-discount-banners',
      }),
    }),
    discountBannerDetail: build.query({
      query: id => ({
        url: `discount-banner-detail/${id}`,
      }),
    }),
    productVariantDetail: build.query({
      query: ({id, latitude, longitude}) => ({
        url: `product-variant-detail/${id}`,
        params: {
          latitude,
          longitude,
        },
      }),
    }),

    claimDiscounts: build.mutation({
      query: ({token, store_product_id}) => ({
        url: 'claim-discounts',
        method: 'POST',
        body: {
          store_product_id,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useDealsQuery,
  useAllDealsQuery,
  useLandscapeDiscountBannersQuery,
  useSquareDiscountBannersQuery,
  useDiscountBannerDetailQuery,
  useProductVariantDetailQuery,
  useClaimDiscountsMutation,
} = dealsApi;

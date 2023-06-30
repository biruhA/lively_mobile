// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: authUrl,
  endpoints: build => ({
    collections: build.query({
      query: () => ({
        url: 'collections',
      }),
    }),
    collectionDetail: build.query({
      query: id => ({
        url: `collection-detail/${id}`,
      }),
    }),
    productList: build.query({
      query: url => ({
        url,
      }),
    }),
    categories: build.query({
      query: () => ({
        url: 'categories',
      }),
    }),
    productCategories: build.query({
      query: () => ({
        url: 'product-categories',
      }),
    }),
    productDetailById: build.query({
      query: id => ({
        url: `product-detail/${id}`,
      }),
    }),
    productsByCategory: build.query({
      query: id => ({
        url: `products-by-category/${id}`,
      }),
    }),
    subCategoriesByCategory: build.query({
      query: id => ({
        url: `sub-categories-by-category/${id}`,
      }),
    }),
    productBySubCategory: build.query({
      query: id => ({
        url: `product-by-sub-category/${id}`,
      }),
    }),
    getTags: build.query({
      query: id => ({
        url: 'get-tags',
      }),
    }),
    search: build.mutation({
      query: ({type, search, lat, lon}) => ({
        url: `search`,
        method: 'GET',
        params: {
          type,
          search,
          lat,
          lon,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useCollectionsQuery,
  useCollectionDetailQuery,
  useProductListQuery,
  useCategoriesQuery,
  useProductCategoriesQuery,
  useProductDetailByIdQuery,
  useSubCategoriesByCategoryQuery,
  useProductBySubCategoryQuery,
  useProductsByCategoryQuery,
  useGetTagsQuery,
  useSearchMutation,
} = productApi;

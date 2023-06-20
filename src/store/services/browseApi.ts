// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

export const browseApi = createApi({
  reducerPath: 'browseApi',
  baseQuery: authUrl,
  endpoints: build => ({
    articleCategories: build.query({
      query: () => ({
        url: 'article-categories',
      }),
    }),
    articlesByCategory: build.query({
      query: id => ({
        url: `articles-by-category/${id}`,
      }),
    }),
    trendingArticles: build.query({
      query: () => ({
        url: 'trending-articles',
      }),
    }),
    allTrendingArticles: build.query({
      query: () => ({
        url: 'all-trending-articles',
      }),
    }),
    popularArticles: build.query({
      query: () => ({
        url: 'popular-articles',
      }),
    }),
    allPopularArticles: build.query({
      query: () => ({
        url: 'all-popular-articles',
      }),
    }),
    articleDetail: build.query({
      query: id => ({
        url: `article-detail/${id}`,
      }),
    }),
    upcomingEvents: build.query({
      query: () => ({
        url: 'upcoming-events',
      }),
    }),
    eventDetail: build.query({
      query: id => ({
        url: `event-detail/${id}`,
      }),
    }),
    latestArticles: build.query({
      query: () => ({
        url: 'latest-articles',
      }),
    }),
    editorsPick: build.query({
      query: () => ({
        url: 'editors-pick',
      }),
    }),
  }),
});

export const {
  useArticleCategoriesQuery,
  useArticlesByCategoryQuery,
  useTrendingArticlesQuery,
  usePopularArticlesQuery,
  useAllPopularArticlesQuery,
  useAllTrendingArticlesQuery,
  useArticleDetailQuery,
  useUpcomingEventsQuery,
  useEventDetailQuery,
  useLatestArticlesQuery,
  useEditorsPickQuery,
} = browseApi;

import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query';

export const baseUrl = 'https://lively.unravelplc.com/api';

export const authUrl = fetchBaseQuery({
  baseUrl: `${baseUrl}/`,
});

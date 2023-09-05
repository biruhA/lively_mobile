import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query';
import {BASE_URL} from '@env';

export const baseUrl = BASE_URL;

export const authUrl = fetchBaseQuery({
  baseUrl: `${baseUrl}/`,
});

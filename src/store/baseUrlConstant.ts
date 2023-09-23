import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query';
import Config from 'react-native-config';

export const baseUrl = Config.BASE_URL;

console.log('🚀 ~ file: baseUrlConstant.ts:5 ~ baseUrl:', baseUrl);

export const authUrl = fetchBaseQuery({
  baseUrl: `${baseUrl}/`,
});

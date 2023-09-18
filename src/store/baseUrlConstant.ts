import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query';
import Config from 'react-native-config';

export const baseUrl = Config.BASE_URL;

export const authUrl = fetchBaseQuery({
  baseUrl: `${baseUrl}/`,
});

import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query';

// Cpanel api
export const baseUrl = 'https://lively.unravelplc.com/api';

// prod api
// export const baseUrl = 'https://api.lively-et.com/api';

// test api
// export const baseUrl = 'https://api-test.lively-et.com/api';

export const authUrl = fetchBaseQuery({
  baseUrl: `${baseUrl}/`,
});

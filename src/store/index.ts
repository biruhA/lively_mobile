import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // [appApi.reducerPath]: appApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat
      // authApi.middleware
      (),
});

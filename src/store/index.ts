import {configureStore} from '@reduxjs/toolkit';
import {
  authReducer,
  browseReducer,
  dealsReducer,
  filterReducer,
  medicineReducer,
  productReducer,
  searchReducer,
  storeReducer,
} from './features';
import {
  authApi,
  browseApi,
  dealsApi,
  filterApi,
  medicineApi,
  productApi,
  storeApi,
} from './services';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    store: storeReducer,
    filter: filterReducer,
    search: searchReducer,
    deals: dealsReducer,
    browse: browseReducer,
    medicine: medicineReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [filterApi.reducerPath]: filterApi.reducer,
    [dealsApi.reducerPath]: dealsApi.reducer,
    [browseApi.reducerPath]: browseApi.reducer,
    [medicineApi.reducerPath]: medicineApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      storeApi.middleware,
      filterApi.middleware,
      dealsApi.middleware,
      browseApi.middleware,
      medicineApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

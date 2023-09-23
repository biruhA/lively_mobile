import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {settingApi, storeApi} from '../services';

interface settingSlice {
  selectedStoreId: string;
}

const initialState: settingSlice = {
  selectedStoreId: '',
};

export const storeSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setStoreId: (state, action: PayloadAction<string>) => {
      state.selectedStoreId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      settingApi.endpoints.getFaqs.matchFulfilled,
      (state, action) => {
        console.log('🚀 ~ file: settingSlice.ts:25 ~ action:', action.payload);
      },
    );
  },
});

export const {setStoreId} = storeSlice.actions;
export default storeSlice.reducer;

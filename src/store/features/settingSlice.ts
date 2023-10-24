import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {settingApi, storeApi} from '../services';

interface settingState {
  selectedStoreId: string;
  currentVersion: string;
}

const initialState: settingState = {
  selectedStoreId: '',
  currentVersion: '',
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setStoreId: (state, action: PayloadAction<string>) => {
      state.selectedStoreId = action.payload;
    },
    setCurrentVersion: (state, action: PayloadAction<string>) => {
      state.currentVersion = action.payload;
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

export const {setStoreId, setCurrentVersion} = settingSlice.actions;
export default settingSlice.reducer;

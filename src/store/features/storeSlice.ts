import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {storeApi} from '../services';

interface storeState {
  selectedStoreId: string;
}

const initialState: storeState = {
  selectedStoreId: '',
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStoreId: (state, action: PayloadAction<string>) => {
      state.selectedStoreId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      storeApi.endpoints.storeDetailById.matchFulfilled,
      (state, action) => {
        console.log(
          '🚀 ~ file: storeSlice.ts:26 ~ action?.payload:',
          action?.payload,
        );
      },
    );
  },
});

export const {setStoreId} = storeSlice.actions;
export default storeSlice.reducer;

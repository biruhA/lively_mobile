import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {storeApi} from '../services';

interface placeState {
  selectedStoreId: string;
}

const initialState: placeState = {
  selectedStoreId: '',
};

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setStoreId: (state, action: PayloadAction<string>) => {
      state.selectedStoreId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      storeApi.endpoints.storeDetailById.matchFulfilled,
      (state, action) => {},
    );
  },
});

export const {setStoreId} = placeSlice.actions;
export default placeSlice.reducer;

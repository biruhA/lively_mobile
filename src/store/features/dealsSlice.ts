import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {productApi} from '../services';

interface dealsState {
  selectedProductId: string;
}

const initialState: dealsState = {
  selectedProductId: '',
};

export const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setSelectedProductVariantIndex: (state, action: PayloadAction<number>) => {
      state.selectedProductVariantIndex = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      productApi.endpoints.productDetailById.matchFulfilled,
      (state, action) => {},
    );
  },
});

export const {setSelectedProductVariantIndex} = dealsSlice.actions;
export default dealsSlice.reducer;

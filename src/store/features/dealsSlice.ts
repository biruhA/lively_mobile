import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {productApi} from '../services';

interface dealsState {
  selectedProductId: string;
  promoCode: string;
}

const initialState: dealsState = {
  selectedProductId: '',
  promoCode: '',
};

export const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setPromoCode: (state, action: PayloadAction<number>) => {
      state.promoCode = action.payload;
    },
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

export const {setPromoCode, setSelectedProductVariantIndex} =
  dealsSlice.actions;
export default dealsSlice.reducer;

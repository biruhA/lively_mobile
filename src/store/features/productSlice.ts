import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {authApi, productApi} from '../services';

interface productState {
  selectedProductId: string;
  selectedSubCategoryId: string;
  selectedProduct: any;
  selectedProductVariantIndex: number;
  selectedCategoryId: string;
  selectedCategory: any;
  searchedProducts: any;
  selectedRate: number;
}

const initialState: productState = {
  selectedProductId: '',
  selectedSubCategoryId: '',
  selectedProduct: {},
  selectedCategoryId: '',
  selectedCategory: {},
  searchedProducts: [],
  selectedProductVariantIndex: 0,
  selectedRate: 0,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProductVariantIndex: (state, action: PayloadAction<number>) => {
      state.selectedProductVariantIndex = action.payload;
    },
    setProductId: (state, action: PayloadAction<string>) => {
      state.selectedProductId = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
    },
    setSelectedSubCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedSubCategoryId = action.payload;
    },
    setSelectedRate: (state, action: PayloadAction<number>) => {
      state.selectedRate = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      productApi.endpoints.productDetailById.matchFulfilled,
      (state, action) => {
        state.selectedProduct = action?.payload?.data;
      },
    );
  },
});

export const {
  setProductId,
  setSelectedSubCategoryId,
  setCategoryId,
  setSelectedProductVariantIndex,
  setSelectedRate,
} = productSlice.actions;
export default productSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {filterApi} from '../services';

interface productState {
  filterData: any;
  brandLabel: string;
  discountLabel: string;
  priceLabel: string;
  distanceLabel: string;
  brandValue: any;
  discountValue: any;
  priceValue: any;
  distanceValue: any;
}

const initialState: productState = {
  filterData: {},
  brandLabel: '',
  discountLabel: '',
  priceLabel: '',
  distanceLabel: '',
  brandValue: {},
  discountValue: {},
  priceValue: {},
  distanceValue: '',
};

export const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedProductVariantIndex: (state, action: PayloadAction<number>) => {
      state.filterData = action.payload;
    },
    setBrand: (state, action: PayloadAction<any>) => {
      state.brandLabel = `${action.payload.length} Brands selected`;
      state.brandValue = action.payload;
    },
    setDiscount: (state, action: PayloadAction<any>) => {
      state.discountLabel = `${action.payload.min}-${action.payload.max} %`;
      state.discountValue = {
        min: action.payload.min,
        max: action.payload.max,
      };
    },
    setPrice: (state, action: PayloadAction<any>) => {
      state.priceLabel = `${action.payload.min}-${action.payload.max} Birr`;
      state.priceValue = {
        min: action.payload.min,
        max: action.payload.max,
      };
    },
    setDistance: (state, action: PayloadAction<any>) => {
      state.distanceLabel = `${action.payload} Km`;
      state.distanceValue = action.payload;
    },
    reset: state => {
      state.brandLabel = `(${state.filterData?.brand?.count} Brands)`;
      state.discountLabel = `(Up-to ${state.filterData?.discount?.max})`;
      state.distanceLabel = `Up-to ${state.filterData?.distance?.max} Birr)`;
      state.priceLabel = `(Up-to ${state.filterData?.price?.max} Km)`;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      filterApi.endpoints.filterCount.matchFulfilled,
      (state, action) => {
        state.filterData = action?.payload?.data;

        //Set all labels
        state.brandLabel = `(${action?.payload?.data?.brand?.count} Brands)`;
        state.discountLabel = `(Up-to ${action?.payload?.data?.discount?.max})`;
        state.distanceLabel = `(Up-to ${action?.payload?.data?.distance?.max} Birr)`;
        state.priceLabel = `(Up-to ${action?.payload?.data?.price?.max} Km)`;
      },
    );
  },
});

export const {
  setSelectedProductVariantIndex,
  setBrand,
  setDiscount,
  setPrice,
  setDistance,
  reset,
} = filter.actions;
export default filter.reducer;

import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {placeApi, storeApi} from '../services';

interface placeState {
  selectedStoreId: string;
  selectedPlace: any;
  storeList: any;
  pharmacieList: any;
}

const initialState: placeState = {
  selectedStoreId: '',
  selectedPlace: {},
  storeList: [],
  pharmacieList: [],
};

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setStoreId: (state, action: PayloadAction<string>) => {
      state.selectedStoreId = action.payload;
    },
    setSelectedPlace: (state, action: PayloadAction<any>) => {
      state.selectedPlace = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      placeApi.endpoints.recommendedStores.matchFulfilled,
      (state, action) => {
        let data = action.payload?.data?.data;
        let is_pharmacy = action?.meta?.arg?.originalArgs?.is_pharmacy;

        if (is_pharmacy) {
          state.pharmacieList.push(...data);
          state.storeList = [];
        } else {
          state.storeList.push(...data);
          state.pharmacieList = [];
        }
      },
    );
  },
});

export const {setStoreId, setSelectedPlace} = placeSlice.actions;
export default placeSlice.reducer;

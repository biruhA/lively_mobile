import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {filterApi, productApi} from '../services';
import {filterLabel} from '../../screens';

interface searchState {
  searchedText: string;
  searchData: any;
  allSearch: any;
  productSearch: any;
  storeSearch: any;
  articleSearch: any;
  selectedFilter: string;
  userLocation: any;
}

const initialState: searchState = {
  searchedText: '',
  searchData: {},
  allSearch: {},
  productSearch: {},
  storeSearch: {},
  articleSearch: {},
  selectedFilter: 'All',
  userLocation: {},
};

export const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchedText: (state, action: PayloadAction<string>) => {
      state.searchedText = action.payload;
    },
    setSelectedFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilter = action.payload;
    },
    setCurrentLocation: (state, action: PayloadAction<string>) => {
      state.userLocation = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      productApi.endpoints.search.matchFulfilled,
      (state, action) => {
        const payload = action?.payload?.data;

        if (state.selectedFilter === 'All') {
          state.allSearch = payload;
        } else if (state.selectedFilter === 'Products') {
          state.productSearch = payload?.data;
        } else if (state.selectedFilter === 'Stores') {
          state.storeSearch = payload?.data;
        } else if (state.selectedFilter === 'Articles') {
          state.articleSearch = payload?.data;
        } else {
          console.log('selectedFilter undefined');
        }
      },
    );
  },
});

export const {setSearchedText, setSelectedFilter, setCurrentLocation} =
  search.actions;
export default search.reducer;

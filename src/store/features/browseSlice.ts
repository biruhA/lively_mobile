import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {storeApi} from '../services';

interface browseState {
  selectedArticleId: string;
  selectedcategory: string;
  selectedEventId: string;
}

const initialState: browseState = {
  selectedArticleId: '',
  selectedcategory: '',
  selectedEventId: '',
};

export const browseSlice = createSlice({
  name: 'browse',
  initialState,
  reducers: {
    setSelectedArticleId: (state, action: PayloadAction<string>) => {
      state.selectedArticleId = action.payload;
    },
    setSelectedcategory: (state, action: PayloadAction<string>) => {
      state.selectedcategory = action.payload;
    },
    setSelectedEventId: (state, action: PayloadAction<string>) => {
      state.selectedEventId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      storeApi.endpoints.storeDetailById.matchFulfilled,
      (state, action) => {},
    );
  },
});

export const {setSelectedArticleId, setSelectedcategory, setSelectedEventId} =
  browseSlice.actions;
export default browseSlice.reducer;

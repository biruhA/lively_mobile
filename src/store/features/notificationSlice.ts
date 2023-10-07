import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {notificationApi} from '../services';

interface notificationSlice {
  hasNotification: boolean;
  notifications: {};
}

const initialState: notificationSlice = {
  hasNotification: false,
  notifications: {},
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setHasNotification: (state, action: PayloadAction<any>) => {
      state.hasNotification = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      notificationApi.endpoints.getMedicineNotification.matchFulfilled,
      (state, action) => {},
    );
    builder.addMatcher(
      notificationApi.endpoints.notifications.matchFulfilled,
      (state, action) => {
        console.log(
          '🚀 ~ file: notificationSlice.ts:25 ~ action:',
          action.payload,
        );
      },
    );
  },
});

export const {setHasNotification} = notificationSlice.actions;
export default notificationSlice.reducer;

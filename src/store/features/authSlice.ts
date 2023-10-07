import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {authApi} from '../services';
import {
  clearProtectedData,
  removeProtectedData,
  storeProtectedData,
} from '../../util';
import {boolean} from 'yup';

// Define a type for the slice state
interface authState {
  token: string;
  fcmToken: string;
  user: any;
  isLoggedIn: boolean;
  inAppLoggedIn: boolean;
  verificationPhoneNumber: string;
  otp: string;
  password: string;
  email: string;
  gender: string;
  dob: string;
}

interface AuthData {
  token: string;
  user: object;
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: authState = {
  token: '',
  user: {},
  isLoggedIn: undefined,
  inAppLoggedIn: undefined,
  verificationPhoneNumber: '',
  otp: '',
  password: '',
  email: '',
  gender: '',
  dob: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    SetDob: (state, action: PayloadAction<any>) => {
      state.dob = action.payload;
    },
    SetGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setVerificationPhoneNumber: (state, action: PayloadAction<string>) => {
      state.verificationPhoneNumber = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = action?.payload;
    },
    setFcmToken: (state, action: PayloadAction<any>) => {
      state.fcmToken = action?.payload;
    },
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      state.token = action?.payload?.token;
      state.user = action?.payload?.user;
    },
    updateUser: (state, action: PayloadAction<AuthData>) => {
      state.user = action?.payload;
      storeProtectedData('user', action?.payload);
    },
    rememberUser: (state, action) => {
      storeProtectedData('user', state.user);
      storeProtectedData('token', state.token);
      //TODO remove this if statement not accepable
      if (action?.payload?.inApp) {
        state.inAppLoggedIn = true;
      }
    },
    logoutUser: (state, action) => {
      removeProtectedData('user');
      removeProtectedData('token');
      removeProtectedData('isLoggedIn');
      state.token = '';
      state.user = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action?.payload?.data?.token;
        state.user = action.payload?.data?.user;

        // state.isLoggedIn = true;
      },
    );
    builder.addMatcher(
      authApi.endpoints.finishRegister.matchFulfilled,
      (state, action) => {
        state.user = action.payload?.data;
        state.isLoggedIn = true;
        storeProtectedData('user', action.payload?.data);
        storeProtectedData('token', state.token);
      },
    );
  },
});

export const {
  rememberUser,
  logoutUser,
  setVerificationPhoneNumber,
  setOtp,
  setPassword,
  setEmail,
  setAuthData,
  setFcmToken,
  setToken,
  SetDob,
  SetGender,
  deleteUser,
  setIsLoggedIn,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {authApi} from '../services';
import {storeProtectedData} from '../../util';
import {boolean} from 'yup';

// Define a type for the slice state
interface authState {
  token: string;
  user: any;
  isLoggedIn: boolean;
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
  isLoggedIn: false,
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
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setVerificationPhoneNumber: (state, action: PayloadAction<string>) => {
      state.verificationPhoneNumber = action.payload;
    },
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      state.token = action?.payload?.token;
      state.user = action?.payload?.user;
      state.isLoggedIn = action?.payload?.isLoggedIn;
    },
    rememberMe: state => {
      storeProtectedData('user', state.user);
      storeProtectedData('token', state.token);
      storeProtectedData('isLoggedIn', true);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action?.payload?.data?.token;
        state.user = action.payload?.data?.user;
        // storeProtectedData('user', state.user);
        // storeProtectedData('token', state.token);
        // storeProtectedData('isLoggedIn', true);
      },
    );
  },
});

export const {
  rememberMe,
  setVerificationPhoneNumber,
  setOtp,
  setPassword,
  setEmail,
  setAuthData,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;

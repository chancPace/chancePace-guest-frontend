import { UserData } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    email: string;
    userName: string;
    role: string;
    token: string;
    id: number;
    phoneNumber: string;
  } | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userInfo: {
    email: '',
    userName: '',
    role: '',
    token: '',
    id: 0,
    phoneNumber: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        email: string;
        userName: string;
        role: string;
        token: string;
        id: number;
        phoneNumber: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
      }
    },
  },
});

export const { loginSuccess, logout, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;

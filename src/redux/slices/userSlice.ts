import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    email: string;
    name: string;
    role: string;
    token: string;
    id: number;
  } | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userInfo: {
    email: '',
    name: '',
    role: '',
    token: '',
    id: 0,
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
        name: string;
        role: string;
        token: string;
        id: number;
      }>
    ) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

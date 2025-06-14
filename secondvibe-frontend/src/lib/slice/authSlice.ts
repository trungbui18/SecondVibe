"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
}

interface AuthState {
  user: UserInfo | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

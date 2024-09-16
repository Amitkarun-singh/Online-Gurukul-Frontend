import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("Online-Gurukul-token", action.payload.Token);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("Online-Gurukul-token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch current user data
export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/v1/users/current-user'); // Replace with your API endpoint
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

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
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

//i want to display the name and avatar of the user in the header of the home page
//i have already created the authSlice.js file in the features folder
//i have also created the store.js file in the app folder
//i have also created the Routes.js file in the src folder
//i have also created the Home.jsx file in the pages folder
//i have also created the App.js file in the src folder
//i have also created the index.js file in the src folder
//i have also created the tailwind.css file in the styles folder
//i have also created the index.css file in the styles folder
//i have also created the font.css file in the styles folder
//i have also created the SignUp.jsx file in the pages folder
//i have also created the Login.jsx file in the pages folder



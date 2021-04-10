import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'Login',
  initialState: {
    LoggedIn: false,
  },

  reducers: {
    changeLoginStatus: (state, action) => {
      state.LoggedIn = action.payload;
    },
  },
});

export const { changeLoginStatus } = loginSlice.actions;

export default loginSlice.reducer;

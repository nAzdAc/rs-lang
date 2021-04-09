import { createSlice } from '@reduxjs/toolkit';

export const statsSlice = createSlice({
  name: 'Stats',
  initialState: {
    tab: 'tables',
  },

  reducers: {
    changeStatsTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { changeStatsTab } = statsSlice.actions;

export default statsSlice.reducer;

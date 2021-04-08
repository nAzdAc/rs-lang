import { createSlice } from '@reduxjs/toolkit';

export const statsSlice = createSlice({
  name: 'Stats',
  initialState: {
    tab: 'tables',
  },

  reducers: {
    changeStatsTab: (state, action) => {
      state.DifficultWordBtn = action.payload;
    },
    changeStatsGraph: (state, action) => {
      state.DifficultWordBtn = action.payload;
    },
  },
});

export const { changeStatsTab, changeStatsGraph } = statsSlice.actions;

export default statsSlice.reducer;

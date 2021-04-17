import { createSlice } from '@reduxjs/toolkit';

export const levelSlice = createSlice({
  name: 'Level',
  initialState: {
    level: null,
  },

  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    deleteLevel: (state) => {
      state.level = null
    }
  },
});

export const { setLevel, deleteLevel } = levelSlice.actions;

export default levelSlice.reducer;
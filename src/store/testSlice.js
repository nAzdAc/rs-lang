import { createSlice } from '@reduxjs/toolkit';

export const testSlice = createSlice({
  name: 'test',
  initialState: {
    value: '',
  },
  reducers: {
    changeTest: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeTest } = testSlice.actions;

export default testSlice.reducer;

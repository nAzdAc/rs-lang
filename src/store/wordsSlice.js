import { createSlice } from '@reduxjs/toolkit';

const initialWordsState = {
  wordsRedux: []
};

export const wordsSlice = createSlice({
  name: 'Words',
  initialState: initialWordsState,

  reducers: {
    addWords: (state = initialWordsState, action) => {
      state.wordsRedux = action.payload;
    },
    deleteWords: (state) => {
      state.wordsRedux = initialWordsState;
    },
  },
});

export const {
  addWords, deleteWords
} = wordsSlice.actions;

export default wordsSlice.reducer;

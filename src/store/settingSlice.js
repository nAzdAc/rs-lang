import { createSlice } from '@reduxjs/toolkit';

export const settingSlice = createSlice({
  name: 'Settings',
  initialState: {
    DifficultWordBtn: true,
    DeleteWordBtn: true,
    TranslateWordBtn: true,
    TranslateSentenceBtn: true,
    Volume: '50',
  },

  reducers: {
    changeDifficultBtn: (state, action) => {
      state.DifficultWordBtn = action.payload;
    },
    changeDeleteBtn: (state, action) => {
      state.DeleteWordBtn = action.payload;
    },
    changeTranslateWordBtn: (state, action) => {
      state.TranslateWordBtn = action.payload;
    },
    changeTranslateSentenceBtn: (state, action) => {
      state.TranslateSentenceBtn = action.payload;
    },

    changeVolume: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {
  changeDifficultBtn,
  changeDeleteBtn,
  changeTranslateWordBtn,
  changeTranslateSentenceBtn,
  changeVolume,
} = settingSlice.actions;

export default settingSlice.reducer;

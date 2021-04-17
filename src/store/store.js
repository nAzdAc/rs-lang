import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './settingSlice';
import statsReduser from './statsSlice';
import loginReduser from './loginSlice';
import wordsReduser from './wordsSlice';
import levelReducer from './levelSlice'

export const store = configureStore({
  reducer: {
    settings: settingReducer,
    stats: statsReduser,
    login: loginReduser,
    words: wordsReduser,
    level: levelReducer
  },
});

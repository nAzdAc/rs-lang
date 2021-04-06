import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './settingSlice';
import statsReduser from './statsSlice';

export const store = configureStore({
  reducer: {
    settings: settingReducer,
    stats: statsReduser,
  },
});

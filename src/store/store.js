import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './settingSlice';
import statsReduser from './statsSlice';
import loginReduser from './loginSlice';

export const store = configureStore({
  reducer: {
    settings: settingReducer,
    stats: statsReduser,
    login: loginReduser,
  },
});

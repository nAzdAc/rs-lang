import { configureStore } from '@reduxjs/toolkit';
import settingSliceReducer from './settingSlice';
import testReducer from './testSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    settings: settingSliceReducer,
  },
});

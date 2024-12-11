import { configureStore } from '@reduxjs/toolkit';
import ipReducer from './features/ipSlice';

export const store = configureStore({
  reducer: {
    ip: ipReducer,
  },
});
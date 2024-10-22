import { configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import sort from './slices/sortSlice';

export const store = configureStore({
  reducer: {
    user,
    sort,
  },
});

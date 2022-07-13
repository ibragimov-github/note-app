import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import DarkThemeSlice from './slices/DarkThemeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    darkTheme: DarkThemeSlice,
  }
})
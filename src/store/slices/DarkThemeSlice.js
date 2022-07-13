import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dark: localStorage.getItem('mode')?localStorage.getItem('mode'):'light'
}

const darkTheme = createSlice({
  name: 'darkTheme',
  initialState,
  reducers: {
    changeTheme(state) {
      state.dark = (state.dark==='dark')?'light':'dark';
    }
  }
});

export const { changeTheme } = darkTheme.actions;
export default darkTheme.reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: localStorage.user ? JSON.parse(localStorage.user).email : 
  sessionStorage.user ? JSON.parse(sessionStorage.user).email : null,
  token: localStorage.user ? JSON.parse(localStorage.user).token : 
  sessionStorage.user ? JSON.parse(sessionStorage.user).token : null,
  id: localStorage.user ? JSON.parse(localStorage.user).id : 
  sessionStorage.user ? JSON.parse(sessionStorage.user).id : null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer
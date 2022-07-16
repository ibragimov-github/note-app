import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import styles from './App.module.scss';
import Homepage from 'pages/Homepage/Homepage';
import Loginpage from 'pages/Loginpage/Loginpage';
import Registerpage from 'pages/Registerpage/Registerpage';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../Header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';



function App() {
  const theme = useSelector(state => state.darkTheme.dark);
  const dispatch = useDispatch();
  useEffect(()=> {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(!user) {
        dispatch(removeUser())
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
      }
    })
  })
  const darkMode = createTheme({
    palette: {
      mode: theme,
      ...(theme === 'dark')
      ? {
        background: {
          default: '#212121'
        }
      }:
      {
        background: {
          default: '#fff'
        }
      }
  }})
  return (
    <ThemeProvider theme={darkMode}>
      <div className={styles.container}>
        <CssBaseline />
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/login' element={<Loginpage />} />
          <Route path='/registration' element={<Registerpage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
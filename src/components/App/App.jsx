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





function App() {
  const theme = useSelector(state => state.darkTheme.dark)
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
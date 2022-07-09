import { Routes, Route, Link, Navigate } from 'react-router-dom';
import React from 'react';
import styles from './App.module.scss';
import Homepage from 'pages/Homepage';
import Loginpage from 'pages/Loginpage';
import Registerpage from 'pages/Registerpage';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header/Header';


function App() {
  return (
    <>
      <CssBaseline />
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Loginpage />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      </>
  )
}

export default App
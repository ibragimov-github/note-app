import { Routes, Route, Link, Navigate } from 'react-router-dom';
import React from 'react';
import styles from './App.module.scss';
import Homepage from 'pages/Homepage';
import Loginpage from 'pages/Loginpage';
import Registerpage from 'pages/Registerpage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Loginpage />} />
      <Route path='/register' element={<Registerpage />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default App
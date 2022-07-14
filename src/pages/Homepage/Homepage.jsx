import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import styles from './Homepage.module.scss';
import { Dialog } from '@mui/material';

function Homepage() {
  const navigate = useNavigate();
  const {isAuth, email} = useAuth();
  useEffect(() => {
    if(!isAuth) {navigate('/login')}
  })
  return (
    <div className={styles.container}>
      <div>Homepage</div>
      <span>Hello! {email}</span>
    </div>
  )
}

export default Homepage
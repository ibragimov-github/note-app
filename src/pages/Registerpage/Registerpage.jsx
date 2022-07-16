import React from 'react';
import Button from '@mui/material/Button';
import Login from 'components/Login/Login';
import Password from 'components/Password/Password';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import styles from './Registerpage.module.scss';
import SubbmitButton from 'components/SubbmitButton/SubbmitButton';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import CustomizedSnackbars from 'components/SnackError/SnackError';
import { useAuth } from 'hooks/use-auth';


function Registerpage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false)
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuth} = useAuth();
  useEffect(() => {
    if(isAuth) {navigate('/')}
  })
  const onSubmit = (e) => {
    e.preventDefault();
    if (password.length >=6 && password.length === password.replace(/\s/g, '').length) {
      setPasswordError(false)
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, login, password)
        .then(({user}) => {
          dispatch(setUser(
          {
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }));
          localStorage.setItem('user', JSON.stringify({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }))
          nav('/')
        })
        .catch(() => setOpen(true))
      setLogin('');
      setPassword('');
    }
    else setPasswordError(true)

  }

  return (

    <div className={styles.container}>
      <div className={styles.login}>
        <Typography
          variant='h4'
          component='span'
        >
          Registration page
        </Typography>
        <form 
          onSubmit={onSubmit}
          id={styles.form}
        >
          <Login login={login} setLogin={setLogin}/>
          <Password 
            passwordError={passwordError}
            password={password} 
            setPassword={setPassword}
          />
          <SubbmitButton text='Registration'/>
          <Button 
            onClick={()=> nav('/login')}
            color='success' 
            variant="text"
          >Registered? Login</Button>
        </form>
        <CustomizedSnackbars text='This email is already in use' open={open} setOpen={setOpen}/>
      </div>
    </div>
  )
}

export default Registerpage
import React from 'react';
import Button from '@mui/material/Button';
import Login from 'components/Login/Login';
import styles from './Loginpage.module.scss';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import Password from 'components/Password/Password';
import SubbmitButton from 'components/SubbmitButton/SubbmitButton';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CustomizedSnackbars from 'components/SnackError/SnackError';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { useAuth } from 'hooks/use-auth';


function Loginpage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [passwordError, setPasswordError] = useState(false)
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuth} = useAuth();
  useEffect(() => {
    if(isAuth) {navigate('/')}
  })
  function changeCheckbox() {setChecked(!checked);}
  const onSubmit = (e) => {
    e.preventDefault();
    if (password.length >=6 && password.length === password.replace(/\s/g, '').length) {
      setPasswordError(false)
      const auth = getAuth();
      signInWithEmailAndPassword(auth, login, password)
        .then(({user}) => {
          dispatch(setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }));
          nav('/');
          checked ? 
            localStorage.setItem('user', JSON.stringify({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })) :
          sessionStorage.setItem('user', JSON.stringify({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }))
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
          Login page
        </Typography>
        <form 
          onSubmit={onSubmit}
          id={styles.form}
        >
          <Login login={login} setLogin={setLogin}/>
          <Password 
            password={password} 
            setPassword={setPassword} 
            passwordError={passwordError}
          />
          <FormControlLabel 
            control={<Checkbox 
                color='warning'
                checked={checked}
                onChange={changeCheckbox}
              />} 
            label="Remember me" 
          />
          <SubbmitButton text='Login'/>
          <Button 
            onClick={()=> nav('/registration')}
            color='success' 
            variant="text"
          >Don't have an account? Sign up</Button>
        </form>
        <CustomizedSnackbars text='Data is incorrect' open={open} setOpen={setOpen}/>
      </div>
    </div>
  )
}

export default Loginpage
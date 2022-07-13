import React from 'react';
import { TextField } from '@mui/material';

function Login({login, setLogin}) {
  return (
    <TextField
      autoComplete='off'
      fullWidth
      type='email'
      label='Email'
      variant='standard'
      color='warning'
      value={login}
      onChange={(e) => setLogin(e.target.value)}
    />
  )
}

export default Login
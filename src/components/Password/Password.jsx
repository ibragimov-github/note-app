import React, { useState } from 'react';
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Password({password, setPassword, passwordError}) {
  const [values, setValues] = useState(true)
  const handleClickShowPassword = () => {setValues(!values)}
  return (
    <FormControl variant='standard'>
      <InputLabel 
        color='warning' 
        htmlFor="standard-adornment-password"
      >
        Password</InputLabel>
      <Input
        error={passwordError}
        type={values?'password':'text'}
        value={password}
        color='warning'
        onChange={(e) => setPassword(e.target.value)}
        autoComplete='on'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {values?<Visibility/>:<VisibilityOffIcon/>}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText
        error={passwordError}
      >
        {password?'Password must be at least six characters long':''}
      </FormHelperText>
    </FormControl>
  )
}

export default Password
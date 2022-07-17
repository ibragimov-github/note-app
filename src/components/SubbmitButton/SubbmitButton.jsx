import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { Button, CircularProgress } from '@mui/material';
function SubbmitButton({state, text}) {
  return (
    <Button 
      disabled={state}
      type='subbmit'
      variant="contained" 
      endIcon={state?<CircularProgress color='inherit' size={20}/>:<LoginIcon />}
      color='warning'
    >
      {text}
    </Button>
  )
}

export default SubbmitButton
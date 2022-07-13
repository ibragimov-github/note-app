import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
function SubbmitButton({disabled, text}) {
  return (
    <Button 
      disabled={disabled}
      type='subbmit'
      variant="contained" 
      endIcon={<LoginIcon />}
      color='warning'
    >
      {text}
    </Button>
  )
}

export default SubbmitButton
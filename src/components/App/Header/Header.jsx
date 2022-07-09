import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import styles from './Header.module.scss';

function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="span" 
          sx={{ flexGrow: 1 }}
        >
          NOTES
        </Typography>
        <IconButton>
          <LogoutIcon 
            sx={{color: '#fff'}}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
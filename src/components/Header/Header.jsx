import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import BurgerIcon from 'components/BurgerIcon/BurgerIcon';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from 'store/slices/DarkThemeSlice';
import { useAuth } from 'hooks/use-auth';
import DrawerMenu from 'components/DrawerMenu/DrawerMenu';

function Header() {
  const theme = useSelector(state => state.darkTheme.dark)
  const dispatch = useDispatch();
  const {isAuth} = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <AppBar 
    sx={{backgroundColor: '#ff9800'}}
    position='static'
    >
      <DrawerMenu isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>
      <Toolbar>
        <BurgerIcon state={isAuth} setIsDrawerOpen={setIsDrawerOpen}/>
        <Typography 
          variant="h6" 
          component="span" 
          color={localStorage.getItem('mode') === 'dark'? 'black':'#fff'}
          sx={{ 
            flexGrow: 1,
            userSelect: 'none'
          }}
        >
          NOTES
        </Typography>
          <IconButton
            onClick={() => {
              dispatch(changeTheme())
              localStorage.setItem('mode', (theme === 'dark'?'light':'dark'));
            }}
          >
            {(theme === 'dark')?
            <LightModeOutlinedIcon 
              sx={{color:'#000'}}
            />:
            <DarkModeOutlinedIcon 
              sx={{color: '#fff'}}
            />}
          </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
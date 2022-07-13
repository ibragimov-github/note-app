import { IconButton } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

function BurgerIcon({state, setIsDrawerOpen}) {
  if(state) {
    return(<IconButton
      onClick={()=> setIsDrawerOpen(true)}
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon 
        sx={{
          color: localStorage.getItem('mode') === 'dark'? 'black':'#fff'
        }}
      />
    </IconButton>)
  }
}

export default BurgerIcon
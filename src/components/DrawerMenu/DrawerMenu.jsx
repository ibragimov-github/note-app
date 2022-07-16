import React from 'react'
import { Drawer, Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';
import Dialog from '../DialogMUI/DialogMUI';
import { getAuth, signOut } from "firebase/auth";

function DrawerMenu({isDrawerOpen, setIsDrawerOpen}) {
  const dispatch = useDispatch();
  return (
    <Drawer
      anchor='left'
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box 
        p={2}
        width='250px'
        textAlign='center'
        role='presentation'
      >
        <nav>
          <List>
            <ListItem sx={{'&:hover':{
              backgroundColor: localStorage.getItem('mode') === 'dark'? '#616161':'#e0e0e0',
              transition: '0.3s',
              cursor: 'pointer'
            }}}
            onClick={() => {
              const auth = getAuth();
              signOut(auth).then(()=> {
                setIsDrawerOpen(false)
                dispatch(removeUser())
                localStorage.removeItem('user')
                sessionStorage.removeItem('user')
              })
            }}
            >
              <ListItemIcon>
                <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText primary='Log out'/>
            </ListItem>
            <Dialog setIsDrawerOpen={setIsDrawerOpen}/>
          </List>
        </nav>
      </Box>
    </Drawer>
  )
}

export default DrawerMenu
import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemIcon, Dialog, 
DialogContent, DialogActions, Button, 
DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth, deleteUser, signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { getDatabase, set, ref } from 'firebase/database';

function DialogMUI({setIsDrawerOpen}) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const deleteUserAction = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    set(ref(db, 'users/' + user.uid), null).then(
      deleteUser(user).then(()=>{
        dispatch(removeUser)
        setIsDrawerOpen(false)
        nav('/login')
      })
    ).catch(
      deleteUser(user).then(()=>{
        dispatch(removeUser)
        setIsDrawerOpen(false)
        nav('/login')
      })
    )
  }
  return (
    <>
      <ListItem 
        sx={{'&:hover':{
        backgroundColor: localStorage.getItem('mode') === 'dark'? '#616161':'#e0e0e0',
        transition: '0.3s',
        cursor: 'pointer'
        }}}
        onClick={handleClickOpen}
        >
        <ListItemIcon>
          <DeleteIcon/>
        </ListItemIcon>
        <ListItemText primary='Delete account'/>
      </ListItem>
      <Dialog
        open={open}
        onClose={()=> setOpen(false)}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
      >
        <DialogTitle id="alert-dialog-title">
          {'Delete account?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-description'>
          This action cannot be undone, the account and all data will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            size="small"
            variant='contained' 
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant='contained'
            color='error'
            onClick={deleteUserAction}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogMUI
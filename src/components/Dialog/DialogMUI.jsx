import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemIcon, Dialog, 
DialogContent, DialogActions, Button, 
DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth, deleteUser } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';

function DialogMUI({setIsDrawerOpen}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const deleteUserAction = () => {
    console.log(true)
    deleteUser(user).then(()=>{
      handleClose()
      setIsDrawerOpen(false)
      dispatch(removeUser())
      localStorage.removeItem('user')
      sessionStorage.removeItem('user')
    }).catch(console.error)
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
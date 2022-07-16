import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import styles from './Homepage.module.scss';
import { Button, Card, CardActions, CardContent, Dialog, Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {CircularProgress} from '@mui/material';


const style = {
  right: 20,
  bottom: 20,
  position: 'fixed'
};
function Homepage() {
  const [bkg, setBkg] = useState(false)
  const navigate = useNavigate();
  const {isAuth} = useAuth();
  useEffect(() => {
    if(!isAuth) {navigate('/login')}
  })
  return (
    <div className={styles.container}>
      <Dialog
        open={bkg}
        onClose={()=>setBkg(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card>
          <CardContent>
            <TextField 
              fullWidth 
              label='Title' 
              autoComplete='off'
              variant="standard"
              color='warning'
              />
              <TextField
                id="outlined-multiline-static"
                fullWidth
                label="Text..."
                multiline
                rows={6}
                variant="outlined"
                color='warning'
                sx={{marginTop:3}}
              />
          </CardContent>
          <CardActions 
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button 
              startIcon={<CloseIcon/>} 
              onClick={()=>setBkg(false)}
              variant='outlined'
              color='error'
            >cancel</Button>
            <Button 
              endIcon={0?<CircularProgress color='inherit' size={20}/>:<DoneIcon/>}
              color='success'
              variant='contained'
            >save</Button>
          </CardActions>
        </Card>
      </Dialog>
      <Fab 
        onClick={()=>setBkg(true)}
        style={style}
        color="primary" 
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Homepage
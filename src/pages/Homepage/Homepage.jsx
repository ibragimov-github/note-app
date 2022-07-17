import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import styles from './Homepage.module.scss';
import { Button, Card, CardActions, CardContent, Dialog, Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveButton from 'components/SaveButton/SaveButton';
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth } from 'firebase/auth';


const style = {
  right: 20,
  bottom: 20,
  position: 'fixed'
};
function Homepage() {
  const [bkg, setBkg] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  let notes = []
  const [checkButton, setCheckButton] = useState(false)
  const navigate = useNavigate();
  const {isAuth} = useAuth();
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;
  if(user) {
    const noteList = ref(db, 'users/' + user.uid + '/database')
    onValue(noteList, (snapshot) => {
      if(snapshot.exists()) {
        notes.push(...snapshot.val())
        console.log(notes[0].content)
      }
    })
  }

  useEffect(() => {
    if(!isAuth) {navigate('/login')}
  })
  return (
    <div className={styles.container}>
      {notes.map(el => <p>{el.content}</p>)}
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
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
              />
              <TextField
                value={content}
                onChange={(e)=> setContent(e.target.value)}
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
            <SaveButton 
            title={title} 
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            setCheckButton={setCheckButton}
            checkButton={checkButton}
            setBkg={setBkg}
            />
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
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import styles from './Homepage.module.scss';
import { Button, Card, CardActions, CardContent, Dialog, Fab, ListItemIcon, Menu, MenuItem, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveButton from 'components/SaveButton/SaveButton';
import { getDatabase, ref, onValue, push, child, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';



const style = {
  right: 20,
  bottom: 20,
  position: 'fixed'
};
function Homepage() {
  const [bkg, setBkg] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [notes, setNotes] = useState([]);
  const [checkButton, setCheckButton] = useState(false)
  const navigate = useNavigate();
  const {isAuth} = useAuth();
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const getPostId = (elem) => {
    let target = elem.target;
    let attr = target.getAttribute('postid');
    const auth = getAuth();
    const db = getDatabase();
    while(!attr) {
      target = target.parentNode;
      attr = target.getAttribute('postid');
    }
    const postData = notes.filter(el => {
      if(el.id !== attr) return el;
    })
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const updates = {}
        updates[`/users/${user.uid}/database`] = postData;
        update(ref(db), updates)
        setNotes(postData)
      }
    })
  }
  const checkNotes = () => {
    const auth = getAuth();
    const dbLink = process.env.REACT_APP_FIREBASE_DATABASE_URL;
    onAuthStateChanged(auth, (user) => {
      if(user) {
        axios.get(`${dbLink}users/${user.uid}/database.json`).then(res => {
          if(res.data) {
            setNotes(res.data)
          }
        }).catch(console.error)
      }
    })

  }
  useEffect(() => {
    if(!isAuth) {navigate('/login')}
    checkNotes()
  }, [])
  if(user) {
    const noteList = ref(db, 'users/' + user.uid + '/database')
    onValue(noteList, (snapshot) => {
      if(snapshot.exists()) {
        if(snapshot.val().length > notes.length || snapshot.val().length < notes.length) {
          checkNotes();
        }
      }
    })
  }





  return (
    <div className={styles.container}>
      {notes.map(el => 
      <Card 
        className={styles.card} 
        key={el.id}
      >
        <CardContent 
          className={styles['card-content']}
          sx={{
            fontSize: {
              lg: 12,
              md: 11,
              sm: 10,
              xs: 10
            },
            wordWrap: 'break-word',
            overflowY: 'auto',
          }}
        >
          <Typography variant='h5' component='span'>
            {el.title}
          </Typography>
          <Typography fontWeight='400' variant='h6' component='span'>
            {el.content}
          </Typography>
        </CardContent>
        <CardActions 
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
        <Button
          color='inherit'
          postid={el.id}
          onClick={(e)=>getPostId(e)}
        >
        <DeleteIcon/>
      </Button>
    </CardActions>
      </Card>)}
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
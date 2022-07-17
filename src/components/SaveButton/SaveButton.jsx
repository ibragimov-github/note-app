import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { Button, CircularProgress } from '@mui/material';
import { v4 } from 'uuid';
import { getDatabase, ref, set, get, child  } from "firebase/database";
import { confirmPasswordReset, getAuth, onAuthStateChanged } from "firebase/auth";

function SaveButton({title, content, setTitle, setContent, checkButton, setCheckButton, setBkg}) {

  const addNote = () => {
    const auth = getAuth();
    const db = getDatabase()
    const user = auth.currentUser;
    if(user) {
      setCheckButton(true)
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.uid}/database`)).then(snapshot => {
        if(snapshot.exists()) {
          set(ref(db, 'users/' + user.uid + '/database'), [
            ...snapshot.val(),
            {
            id: v4(),
            title,
            content
          }]
        ).then(()=> {
          setTitle('')
          setContent('')
          setCheckButton(false)
          setTitle('')
          setContent('')
          setBkg(false)
        })
        }
        else {
          set(ref(db, 'users/' + user.uid + '/database'), [
            {
            id: v4(),
            title,
            content
          }]
        ).then(()=> {
          setTitle('')
          setContent('')
          setCheckButton(false)
          setTitle('')
          setContent('')
          setBkg(false)
        })
        }
      })
    }
  }
  return (
    <Button 
    endIcon={checkButton?<CircularProgress color='inherit' size={20}/>:<DoneIcon/>}
    disabled={(title && content)?false:true}
    color='success'
    variant='contained'
    onClick={()=>addNote()}
  >
    save
  </Button>
  )
}

export default SaveButton
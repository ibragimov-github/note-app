import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddNote() {
  const style = {
    right: 20,
    bottom: 20,
    position: 'fixed'
  }
  return (
    <div>
      <Fab style={style} color="primary" aria-label="add">
        <AddIcon/>
      </Fab>
    </div>
  )
}

export default AddNote
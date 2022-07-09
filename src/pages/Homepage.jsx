import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Homepage() {
  const navigate = useNavigate();
  useEffect(() => {
    if(true) {navigate('/login')}
  })
  return (
    <div>Homepage</div>
  )
}

export default Homepage
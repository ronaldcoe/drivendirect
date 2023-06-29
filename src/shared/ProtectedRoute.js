import React, {useState, useEffect} from 'react'
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router';
import { auth } from '../Firebase/FirebaseConfig';

const ProtectedRoute = ({children }) => {
  const navigate = useNavigate();
  const [user, setUser]= useState(null)
  
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        navigate('/login');
      }});

      return () => unsubscribe(); 
  }, [])
  
  if(user){
  return children
  }
  
};
export default ProtectedRoute;

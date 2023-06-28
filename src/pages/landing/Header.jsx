import React, { useEffect, useState } from 'react';
import '../../styles/blocks/header.css'
import logo from '../../images/logo.png'
import { auth } from '../../Firebase/FirebaseConfig';
import { getUserInfo } from '../../Firebase/FirebaseStateManagement';

export default function Header() {

  const [user, setUser] = useState(null);
  const [account, setAccount] = useState()
  console.log(user)
  
  useEffect(()=>{
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserInfo()
        // User is signed in
        setUser(user);

      }});

      return () => unsubscribe(); 
  }, [])

  const fetchUserInfo = async ()=>{
    var userId = localStorage.getItem('userId')
    var userInfo = await getUserInfo(userId)
    if (userInfo){
        setAccount(userInfo)
    }
  }


  const logoutUser = async () => {
    try {
      await auth.signOut();
      // Perform any additional actions or UI updates after successful logout
      console.log('User logged out successfully');
    } catch (error) {
      console.log('Logout failed:', error);
      // Handle the error appropriately
    }
  };

  return (
    <div className='header'>
      <div className='header__wrapper'> 
        <div className='header__logo'>
          <a href='/'>Carznot</a>
        </div>
        <nav>
          
          <ul>
            <li>{user?<a href='./dashboard'>Welcome {account?.firstName}</a>:<a href='./login'>Log in</a>}</li>
            <li>{user?<a href='/' onClick={logoutUser}>Log out</a>:<a href='./signup'>Sign up</a>}</li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

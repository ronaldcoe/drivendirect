import React, { useState } from 'react'
import '../../styles/blocks/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import Error from '../../shared/notifications/Error';
import {loginUser} from "../../Firebase/FirebaseStateManagement"
import { getCountries } from '../../Firebase/FirebaseStateManagement';

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [showError, setShowError] = useState(false)

    const login=async(e)=>{
        e.preventDefault();
        try {
            const userCreds = await loginUser(userName, password);
            if (userCreds) {
              console.log(userCreds)
                //   Set the local Storage
                localStorage.setItem("userId",userCreds.user.uid)
                localStorage.setItem("accessToken",userCreds.user.accessToken)

              console.log('User was logged in');
              setShowError(false)
            } else {
              console.log('User login fail');
            }
          } catch (error) {
            setShowError(true)
          }     
    }
    
    // Handleres for show password
    const handleShowPassword = () =>{
        if (!showPassword) {
            setShowPassword(true)

        } else {
            setShowPassword(false)
        }
    }
   
  return (
    <div className='login'>
      
        <div className='login__wrapper'>
        {showError && <Error close={{showError, setShowError}} message={"Your email or password don't match our database"} />}
            <div className='login__wrapper__content'>
                <h1>Login</h1>
                <p className='login__wrapper__content__login'>Don't have an account? <a href="/signup">Sign up for free</a></p>
                <form onSubmit={login}>
                    <label>
                        <p>Email</p>

                        <input type="email" required onChange={(e)=>{setUserName(e.target.value)}}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type={showPassword?'text':'password'} required onChange={(e)=>{setPassword(e.target.value)}}/>

                        <FontAwesomeIcon className="login__wrapper__content__eyeicon" icon={showPassword?faEyeSlash:faEye} onClick={handleShowPassword}/>
                    </label>
                    <a className='login__wrapper__content__resetpassword' href='#'>Forgot Password?</a>
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </div>
    </div>
  )
}

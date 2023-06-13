import React, { useState } from 'react'
import '../../styles/blocks/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {loginUser} from "../../Firebase/FirebaseStateManagement"

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)


    const login=async(e)=>{
        e.preventDefault();
        try {
            const userCreds = await loginUser(userName, password);
            if (userCreds) {
              console.log(userCreds)
              console.log('User was logged in');
              setError(false)
            } else {
              console.log('User login fail');
            }
          } catch (error) {
            setError(true)
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
      {error && <div>Error</div> }
        <div className='login__wrapper'>
            <div className='login__wrapper__content'>
                <h1>Login</h1>
                <p className='login__wrapper__content__login'>Don't have an account? <a href="/signup">Sign up for free</a></p>
                <form onSubmit={login}>
                    <label>
                        <p>User Name</p>

                        <input type="text" name="" id="" onChange={(e)=>{setUserName(e.target.value)}}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type={showPassword?'text':'password'} name="" id=""  onChange={(e)=>{setPassword(e.target.value)}}/>

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

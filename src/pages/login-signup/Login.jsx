import React, { useState } from 'react'
import '../../styles/blocks/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()

    // Handleres for show password
    const handleShowPassword = () =>{
        if (!showPassword) {
            setShowPassword(true)

        } else {
            setShowPassword(false)
        }
    }

    // Handleres for change the state of username and password
    const handleSetUserName = (event) => {
        setPassword(event.target.value)
    }
    
    const handleSetPassword = (event) => {
        setUserName(event.target.value)
    }

  return (
    <div className='login'>
        <div className='login__wrapper'>
            <div className='login__wrapper__content'>
                <h1>Login</h1>
                <p className='login__wrapper__content__login'>Don't have an account? <a href="/signup">Sign up for free</a></p>
                <form action="get">
                    <label>
                        <p>User Name</p>
                        <input type="email" name="" id=""  required onChange={handleSetUserName}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type={showPassword?'text':'password'} name="" id="" required onChange={handleSetPassword}/>
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

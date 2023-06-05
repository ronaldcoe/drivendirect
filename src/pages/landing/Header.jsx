import React from 'react';
import '../../styles/blocks/header.css'
import logo from '../../images/logo.png'

export default function Header() {
  return (
    <div className='header'>
      <div className='header__wrapper'> 
        <div className='header__logo'>
          <a href='/'><img src={logo} alt="logo" width='70' /></a>
        </div>
        <nav>
          <ul>
            <li><a href='./login'>Login</a></li>
            <li><a href='./signup'>Sign up</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

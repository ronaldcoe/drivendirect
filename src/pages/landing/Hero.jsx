import React from 'react'
import { useNavigate } from 'react-router';
import '../../styles/blocks/hero.css'

export default function Hero() {

  const navigate = useNavigate()
  return (
    <div className='hero'>
        <div className='hero__wrapper'>
          <div className='hero__call_to_action'>
              <h1>
              Helping Dealers
              </h1>
              <h1>
              Help each other
              </h1>
              <button className='hero__call_to_action_primarybutton' onClick={()=>{navigate("/login")}}>Start Today</button>
            
          </div>
          
        </div>
    </div>
  )
}

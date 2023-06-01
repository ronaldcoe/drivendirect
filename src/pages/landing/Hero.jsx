import React from 'react'
import carBanner from '../../images/carbanner.png'
import '../../styles/blocks/hero.css'

export default function Hero() {
  return (
    <div className='hero'>
        <div className='hero__call_to_action'>
            <h1>
                The new way for dealers
                to sell and search 
                cars 
            </h1>
            <button>Start Today!</button>
        </div>
        <img src={carBanner} alt="" />
    </div>
  )
}

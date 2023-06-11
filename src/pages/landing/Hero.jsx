import React from 'react'
import carBanner from '../../images/car_banner.png'
import '../../styles/blocks/hero.css'

export default function Hero() {
  return (
    <div className='hero'>
        <div className='hero__wrapper'>
          <div className='hero__call_to_action'>
              <h1>
              HELPING DEALERS
              HELP EACHOTHER
              </h1>
              <button className='hero__call_to_action_primarybutton'>Start Today</button>
              <button className='hero__call_to_action_secondarybutton'>Learn More</button>
          </div>
          
        </div>
    </div>
  )
}

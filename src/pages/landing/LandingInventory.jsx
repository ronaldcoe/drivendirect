import React from 'react'
import '../../styles/blocks/landinginventory.css'
import CardGrid from '../../shared/CarInformation/CardGrid'


export default function LandingInventory() {
  return (
    <div className='landinginventory'>
        <div className='landinginventory__wrapper'>
            <h1>Check our Inventory</h1>
            <CardGrid></CardGrid>
        </div>
    </div>
  )
}

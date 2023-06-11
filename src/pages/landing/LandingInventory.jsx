import React from 'react'
import '../../styles/blocks/landinginventory.css'
import CardGrid from '../../shared/CarInformation/CardGrid'


export default function LandingInventory() {
  return (
    <div className='landinginventory'>
        <div className='landinginventory__wrapper'>
            <div>
              <h1>Check our Inventory</h1>
              <p>Dealerships add new cars daily, keeping their inventories fresh and diverse to meet customer demands. With a constant influx of models, they ensure car enthusiasts can find the perfect vehicle for their needs.</p>
            </div>
            <CardGrid></CardGrid>
        </div>
    </div>
  )
}

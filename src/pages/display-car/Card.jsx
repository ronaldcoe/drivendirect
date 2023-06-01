import React, { useEffect, useState } from 'react'
import data from './car-data.json'
import '../../styles/blocks/card.css'

export default function Card() {

    const [carData, setCarData] = useState([])

   useEffect(() => {
    setCarData(data)
   })


    console.log(carData)


  return (
    <div className='cardContainer'>
        {carData.map((item)=> {
            return (
                <div className='cardContainer__card'>
                    <div className='cardContainer__card__title'>
                        <h3>{item.year} {item.make} {item.model}</h3>
                        <p>{item.location}</p>
                    </div>
                    <div className='cardContainer__card__description'>
                        {item.description}
                    </div>
                </div>
            )
        })}
    </div>
  )
}

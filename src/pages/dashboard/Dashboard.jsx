import React from 'react'
import '../../styles/blocks/dashboard.css'
import VehicleCard from './VehicleCard'

export default function Dashboard() {

    const car = [{make: "Honda", model:"Civic", year:"2019", description:"Reliable and fuel-efficient compact car."}]
    const selling = [{make: "Honda", model:"Civic", year:"2019", description:"Reliable and fuel-efficient compact car."},
    {make: "Honda", model:"Civic", year:"2019", description:"Reliable and fuel-efficient compact car."}
    ]

  return (
    <div className='dashboard'>
        <div className='dashboard__wrapper'>
            <div className='dashboard__wrapper_col_1'>
                <div className='dashboard__wrapper__profile'>
                    <div className='dashboard__wrapper__profile__picture'>
                        RC
                    </div>
                    <div className='dashboard__wrapper__profile__info'>
                        <h2>Ryan Smith</h2>
                        <h3>Contact Information</h3>
                        <p>Ryan's car</p>
                        <p>ryanscar@gmail.com</p>
                        <p>www.ryancars.com</p>
                        <p>+1 208 345 6789</p>

                        <h3>Location</h3>
                        <p>Idaho Falls</p>
                        <p>Idaho</p>
                        <p>USA</p>
                    </div>
            </div>
        </div>
        <div className='dashboard__wrapper_col_2'>
            <div className='dashboard__wrapper__section'>
                <div>
                    <h2>Tradings</h2>
                </div>
                {car.map((item, key)=> {
                    return(
                        <VehicleCard car={item} key={key}/>
                    )
                })}
                {car.length<2?<button> + Add Vehicle</button>:""}
            </div>
        </div>
        <div className='dashboard__wrapper_col_3'>
            <div className='dashboard__wrapper__section'>
                <div>
                    <h2>Searching</h2>
                    {selling.map((item, key)=> {
                    return(
                        <VehicleCard car={item} key={key}/>
                    )
                })}
                    {selling.length<2?<button> + Add Vehicle</button>:""}
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

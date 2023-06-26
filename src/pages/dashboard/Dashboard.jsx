import React, { useState } from 'react'
import '../../styles/blocks/dashboard.css'
import VehicleCard from './VehicleCard'
import { useNavigate } from 'react-router';
import menu from '../../images/menu_dots.svg'
import { ReactSVG } from 'react-svg';


export default function Dashboard() {

    const account = [{
        city: "Rexburg",
        country: "USA",
        dealership:"Lakeram Narine",
        email: "nar19002@byui.edu",
        firstName: "Lakeram",
        lastName: "Narine",
        phoneNumber: "2084775405",
        region: "Alaska",
        website: "www.honda.com"
    }]
    
    const car = [{make: "Honda", model:"Civic", year:"2019", description:"Reliable and fuel-efficient compact car."}]
    const selling = [{make: "Honda", model:"Civic", year:"2019", description:"Reliable and fuel-efficient compact car."}
    ]

    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false)
    
  return (
    <div className='dashboard'>
        <div className='dashboard__wrapper'>
            <div className='dashboard__wrapper_col_1'>
                <div className='dashboard__wrapper__profile'>
                    <div className='dashboard__wrapper__profile__picture'>
                        {account[0].firstName.slice(0,1)}{account[0].lastName.slice(0,1)}
                    </div>
                    <div className='dashboard__wrapper__profile__info'>
                        <h2>{account[0].firstName} {account[0].lastName}</h2>
                        <h3>Contact Information</h3>
                        <p>{account[0].dealership}</p>
                        <p>{account[0].email}</p>
                        <p>{account[0].website}</p>
                        <p>{account[0].phoneNumber}</p>

                        <h3>Location</h3>
                        <p>{account[0].city}</p>
                        <p>{account[0].region}</p>
                        <p>{account[0].country}</p>
                    </div>
                    <ReactSVG src={menu} className='menu' onClick={()=>{setShowOptions(!showOptions)}}/>
                    {showOptions && <div className='options'>
                        <ul>
                            <li><a>Edit account</a></li>
                        </ul>
                    </div>
                    }
            </div>
        </div>
        <div className='dashboard__wrapper_col_2'>
            <div className='dashboard__wrapper__section'>
                <div>
                    <h2>Tradings</h2>
                </div>
               <div>
                {car.map((item, key)=> {
                        return(
                            <VehicleCard car={item} key={key}/>
                        )
                    })}
                    {car.length<2?<button onClick={()=>{navigate('/trade');}}> + Add Vehicle</button>:""}
               </div>
            </div>
        </div>
        <div className='dashboard__wrapper_col_3'>
            <div className='dashboard__wrapper__section'>
                <div>
                    <h2>Searching</h2>
                </div>
                    {selling.map((item, key)=> {
                    return(
                        <VehicleCard car={item} key={key}/>
                    )
                })}
                    {selling.length<2?<button onClick={()=>{navigate("/search")}}> + Add Vehicle</button>:""}
                
            </div>
        </div>
    </div>
    
    </div>
  )
}

import React, { useEffect, useState, useRef } from 'react'
import '../../styles/blocks/dashboard.css'
import VehicleCard from './VehicleCard'
import { useNavigate } from 'react-router';
import menu from '../../images/menu_dots.svg'
import { ReactSVG } from 'react-svg';
import { getUserInfo, getAllInventoryByEntity } from '../../Firebase/FirebaseStateManagement';


export default function Dashboard(props) {
    document.title = props.title
    const [account, setAccount] = useState()
    const [trades, setTrades] = useState()
    const [listings, setListings] = useState()
    const [showOptions, setShowOptions] = useState(false)
    const optionsRef = useRef(null);
    const navigate = useNavigate();
    // These will be changed in the future
    const tradeMax = 2
    const listMax = 2

    // This is to help with the Update of the inventory
    const [update, setUpdate] = useState(false)

    const fetchUserInfo = async ()=>{
        var userId = localStorage.getItem('userId')
        var userInfo = await getUserInfo(userId)
        if (userInfo){
            setAccount(userInfo)
            console.log(account?.region)
        }
    }

    localStorage.setItem("region", account?.region)
    const fetchTrades = async ()=>{
        var userId = localStorage.getItem('userId')
        var tradeVehicles = await getAllInventoryByEntity("userId", userId, "trade")
        setTrades(tradeVehicles)
    }

    const fetchListing = async ()=>{
        var userId = localStorage.getItem('userId')
        var listVehicles = await getAllInventoryByEntity("userId", userId, "listing")
        setListings(listVehicles)
    }

    useEffect(() => {
    const handleMouseDown = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);


    useEffect(()=>{
        fetchUserInfo()
        fetchTrades()
        fetchListing()
    }, [update])

  return (
    <div className='dashboard'>
        <div className='dashboard__wrapper'>
            <div className='dashboard__wrapper_col_1'>
                <div className='dashboard__wrapper__profile'>
                    <div className='dashboard__wrapper__profile__picture'>
                        {account?.firstName.slice(0,1)}{account?.lastName.slice(0,1)}
                    </div>
                    <div className='dashboard__wrapper__profile__info'>
                        <h2>{account?.firstName} {account?.lastName}</h2>
                        <h3>Contact Information</h3>
                        <p>{account?.dealership}</p>
                        <p>{account?.email}</p>
                        <p>{account?.website}</p>
                        <p>{account?.phoneNumber}</p>

                        <h3>Location</h3>
                        <p>{account?.city}</p>
                        <p>{account?.region}</p>
                        <p>{account?.country}</p>
                    </div>
                    <ReactSVG src={menu} className='menu' onClick={()=>{setShowOptions(!showOptions)}}/>
                    {showOptions && (<div ref={optionsRef} className='options'>
                        <ul>
                            <li><a>Edit account</a></li>
                        </ul>
                    </div>
                    )}
            </div>
        </div>
        <div className='dashboard__wrapper_col_2'>
            <div className='dashboard__wrapper__section'>
                <div>
                    <h2>Tradings</h2>
                </div>
               <div>
                {trades?.map((item, key)=> {
                        return(
                            <VehicleCard car={item} key={key} type={"trade"} onUpdate={setUpdate} update={update} />
                        )
                    })}
                    {trades?.length<tradeMax?<button onClick={()=>{navigate('/trade');}}> + Add Vehicle</button>:""}
               </div>
            </div>
        </div>
        <div className='dashboard__wrapper_col_3'>
            <div className='dashboard__wrapper__section'>
                <div>
                    <h2>Searching</h2>
                </div>
                    {listings?.map((item, key)=> {
                    return(
                        <VehicleCard car={item} key={key} type={"listing"} onUpdate={setUpdate} update={update}/>
                    )
                })}
                    {listings?.length<listMax?<button onClick={()=>{navigate("/search")}}> + Add Vehicle</button>:""}
                
            </div>
        </div>
    </div>
    
    </div>
  )
}

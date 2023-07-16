import React, { useEffect, useState, useRef } from 'react'
import '../../styles/blocks/dashboard.css'
import VehicleCard from './VehicleCard'
import { useNavigate } from 'react-router';
import menu from '../../images/menu_dots.svg'
import { ReactSVG } from 'react-svg';
import { getUserInfo, getAllInventoryByEntity, getAllStripeProducts, stripeCheckOut } from '../../Firebase/FirebaseStateManagement';
import iconInfo from "../../images/icons-info.svg"

import { firestore } from '../../Firebase/FirebaseConfig';

export default function Dashboard(props) {
    document.title = "Dashboard"
    const [account, setAccount] = useState()
    const [trades, setTrades] = useState()
    const [listings, setListings] = useState()
    const [showOptions, setShowOptions] = useState(false)

    /****************************************************************************************** */
    // This is for the stripe products : Only testing will move in the future
    const [products, setProducts]= useState([])

    const checkout = async(priceId)=>{
        const userId = localStorage.getItem("userId")
     
        await stripeCheckOut(userId, priceId)

    }

    useEffect(()=>{
        const fetchStripeProducts = async()=>{
            const products = await getAllStripeProducts()
            console.log(products)
            setProducts(products)
        }
        fetchStripeProducts()
    }, [])

    /****************************************************************************************** */

    const optionsRef = useRef(null);
    const navigate = useNavigate();
    // These will be changed in the future
    const tradeMax = account?.tradeMax
    const listMax = account?.searchMax
    
    // This is to help with the Update of the inventory
    const [update, setUpdate] = useState(false)

    // Show extra info about trading and listing
    const [showTradingInfo, setShowTradingInfo] = useState(false)
    const [showListingInfo, setShowListingInfo] = useState(false)

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
            setShowListingInfo(false);
            setShowTradingInfo(false)
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
                        <p>{account?.businessName}</p>
                        <p>{account?.email}</p>
                        <p>{account?.website}</p>
                        <p>{account?.phoneNumber}</p>

                        <h3>Location</h3>
                        <p>{account?.city}</p>
                        <p>{account?.region}</p>
                        <p>{account?.country}</p>
                    {/* *************************************STRIPE STUFF****************************************************** */}
                    <div>
                        <h2>Products</h2>
                        {products?.map((product)=>{
                            return <div key={product.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                                        <h2>{product.name}</h2>
                                        <p>{product.description}</p>
                                        <p></p>
                                        <button onClick={()=>{checkout(product.prices[0].id)}}>Subscribe</button>
                                    </div>
                        })}
                    </div>
                    
                    {/* ******************************************************************************************* */}
                    </div>
                    <ReactSVG src={menu} className='menu' onClick={()=>{setShowOptions(!showOptions)}}/>
                    {showOptions && (<div ref={optionsRef} className='options'>
                        <ul>
                            <li><a onClick={()=> navigate("/account")}>Edit account</a></li>
                        </ul>
                    </div>
                    )}
            </div>
        </div>
        <div className='dashboard__wrapper_col_2'>
            <div className='dashboard__wrapper__section'>
                <div>
                    <h2>Tradings <span className="tradingInfoIcon" onClick={() => {setShowTradingInfo(!showTradingInfo); setShowListingInfo(false);}}> <img src={iconInfo} alt="Information about Tradings" width="15px" /></span></h2>
                    
                    {showTradingInfo && (<p ref={optionsRef} className='tradingInfo'>List vehicles here that you are selling or trading. Dealers will contact you, if you have what they need or you can search our <strong>Searching Inventory</strong>. Listings will disappear after 7 days of creation.</p>)
                    }
                </div>
               <div>
                {trades?.map((item, key)=> {
                        return(
                            <VehicleCard car={item} key={key} type={"trade"} onUpdate={setUpdate} update={update} />
                        )
                    })}
                    {trades?.length<tradeMax?<button className="dashboard__update" onClick={()=>{navigate('/trade');}}> + Add Vehicle</button>:""}
               </div>
            </div>
        </div>
        <div className='dashboard__wrapper_col_3'>
            {account?.businessType !== "rental"&&
                <div className='dashboard__wrapper__section'>
                <div>
                    <h2>Searching <span className="tradingInfoIcon" onClick={() => { setShowListingInfo(!showListingInfo); setShowTradingInfo(false)} }> <img src={iconInfo} alt="Information about Tradings" width="15px" /></span></h2>
                    
                    {showListingInfo && <><p ref={optionsRef} className='listingInfo'>List vehicles here that you are in need of. Dealers will contact you, if they have what you need or you can search our <strong>Trading Inventory</strong>. Listings will disappear after 7 days of creation.</p></>
                    }
                </div>
                    {listings?.map((item, key)=> {
                    return(
                        <VehicleCard car={item} key={key} type={"listing"} onUpdate={setUpdate} update={update}/>
                    )
                })}
                    {listings?.length<listMax?<button className="dashboard__update" onClick={()=>{navigate("/search")}}> + Add Vehicle</button>:""}
                
            </div>
            }
        </div>
    
    
    </div>
    
    </div>
  )
}

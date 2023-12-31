import React, { useEffect, useState, useRef } from 'react'
import '../../styles/blocks/dashboard.css'
import VehicleCard from './VehicleCard'
import { useNavigate } from 'react-router';
import menu from '../../images/menu_dots.svg'
import { ReactSVG } from 'react-svg';
import { getUserInfo, stripeCheckOut, getAllInventoryByEntity,getSubscription ,planPerUser} from '../../Firebase/FirebaseStateManagement';
import iconInfo from "../../images/icons-info.svg"
import { Skeleton } from '@mui/material';
import LoadingAnimation from '../../shared/Loading';
/**
 * @author : Lakeram && Ronald
 * @description :Dashboard is only accessible to signed in users. Displays User Infomation, 
 * user Listing or searches and gives user the abilty to add trades and searches depending on their subscription type
 * @returns: JSX
 * @copyright: drivendirect @ 8/1/2023
 */
export default function Dashboard() {
    document.title = "Dashboard"
    const [account, setAccount] = useState()
    const [trades, setTrades] = useState()
    const [listings, setListings] = useState()
    const [showOptions, setShowOptions] = useState(false)
    const [hasSubscription, setHasSubscription]  = useState(false)
    const[accountStatus, setAccountStatus] = useState(false)
    const[priceId, setPriceId] = useState(null)
    const [loading, setLoading] = useState(false)
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

    // Gets user information to Display on the Dashboard
    const fetchUserInfo = async ()=>{
        var userId = localStorage.getItem('userId')
        var userInfo = await getUserInfo(userId)
        if (userInfo){
            setAccount(userInfo)            
        }
    }

    localStorage.setItem("region", account?.region)

    
    // Gets all the Trades that a user has to be displayed
    const fetchTrades = async ()=>{
        var userId = localStorage.getItem('userId')
        var tradeVehicles = await getAllInventoryByEntity("userId", userId, "trade")
        setTrades(tradeVehicles)
    }

    // Gets all the List that a user has to be displayed
    const fetchListing = async ()=>{
        var userId = localStorage.getItem('userId')
        var listVehicles = await getAllInventoryByEntity("userId", userId, "listing")
        setListings(listVehicles)
    }

    // This is done to help with the close pop-ups
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

    // This is the checkout to stripe if the user does not have a subscription
    const checkOut = async()=>{
        setLoading(true)
        const userId = localStorage.getItem("userId")
        const priceId = await planPerUser(userId)
        await stripeCheckOut(userId, priceId)
        
    }
    // We are getting subscriptions to have sure that the users does not
    // have access to create listings or trade without being subscribed
    // (this will be implemented in the backend also)
    useEffect(() => {
        const checkSubscription = async () => {
            var userId = localStorage.getItem('userId')
            const hasSubscription = await getSubscription(userId);
            if (hasSubscription.length >= 1){setHasSubscription(true)}
        };
    
        checkSubscription();
      }, []);
    
    // Usual Effect
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
                    {account?<div className='dashboard__wrapper__profile__picture'>
                        
                        {account?.firstName.slice(0,1)}{account?.lastName.slice(0,1)}
                    </div>:<Skeleton variant="circular" width={40} height={40} />}
                    {account?<div className='dashboard__wrapper__profile__info'>
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
                   
                    </div>:<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                        <Skeleton variant="rounded" width={200} height={20} />
                        <Skeleton variant="rounded" width={150} height={10} />
                        <Skeleton variant="rounded" width={100} height={10} />
                        <Skeleton variant="rounded" width={100} height={10} />
                        <Skeleton variant="rounded" width={150} height={10} />
                        <Skeleton variant="rounded" width={100} height={10} />
                        <Skeleton variant="rounded" width={100} height={10} />
                    </div>
                    }
                    
                    <ReactSVG src={menu} className='menu' onClick={()=>{setShowOptions(!showOptions)}}/>
                    {showOptions && (<div ref={optionsRef} className='options'>
                        <ul>
                            <li><a onClick={()=> navigate("/account")}>Manage account</a></li>
                        </ul>
                    </div>
                    )}
            </div>
        </div>
        <div className='dashboard__wrapper_col_2'>
            <div className='dashboard__wrapper__section'>
                <div>
                    <div className='dashboard__wrapper__card_title'>
                        <h2>Tradings <span className="tradingInfoIcon" onClick={() => {setShowTradingInfo(!showTradingInfo); setShowListingInfo(false);}}> <img src={iconInfo} alt="Information about Tradings" width="15px" /></span></h2>
                        <p>{trades?.length}/{account?.tradeMax}</p>
                    </div>
                    
                    {showTradingInfo && (<p ref={optionsRef} className='tradingInfo'>List vehicles here that you are selling or trading. Dealers will contact you if you have what they need or you can search our <strong>Searching Inventory</strong>. Listings will disappear after 7 days of creation.</p>)
                    }
                </div>
                {trades?"":<Skeleton variant="rounded" width={300} height={60} style={{marginTop:"20px"}} />}
               <div className='dashboard__wrapper__section__cards'>
                
                {trades?.map((item, key)=> {
                        return(
                            <VehicleCard car={item} key={key} type={"trade"} onUpdate={setUpdate} update={update} />
                        )
                    })}
               </div>
               {trades?.length<tradeMax && hasSubscription? <button className="dashboard__update" onClick={()=>{navigate('/trade');}}> + Add Vehicle</button>
                :trades?.length<tradeMax && (account?.accountStatus==="approved" || account?.businessType!=="renter")
                ?<button className="dashboard__update" onClick={checkOut}>{loading?<><LoadingAnimation /> Processing</>:<><p>You need to Subscribe to a plan to enable feature. <strong>Click to Subscribe</strong></p></>}</button>
                :trades?.length<tradeMax?<button className="dashboard__update">Your account is pending approval</button>:""}
            </div>
        </div>
        <div className='dashboard__wrapper_col_3'>
            {account?.businessType !== "rental"&&
                <div className='dashboard__wrapper__section'>
                <div>
                    <div className='dashboard__wrapper__card_title'>
                        <h2>Searching <span className="tradingInfoIcon" onClick={() => { setShowListingInfo(!showListingInfo); setShowTradingInfo(false)} }> <img src={iconInfo} alt="Information about Tradings" width="15px" /></span></h2>
                    
                        {showListingInfo && <><p ref={optionsRef} className='listingInfo'>List vehicles here that you are in need of. Dealers will contact you, if they have what you need or you can search our <strong>Trading Inventory</strong>. Listings will disappear after 7 days of creation.</p></>
                        }
                        <p>{listings?.length}/{account?.searchMax}</p>
                    </div>
                    
                </div>
                    {listings?"":<Skeleton variant="rounded" width={300} height={60} style={{marginTop:"20px"}} />}
                    {listings?.map((item, key)=> {
                    return(
                        <VehicleCard car={item} key={key} type={"listing"} onUpdate={setUpdate} update={update}/>
                    )
                })}
                    {listings?.length<listMax && hasSubscription?
                    <button className="dashboard__update" onClick={()=>{navigate("/search")}}> + Add Vehicle</button>
                    :listings?.length<listMax ?<button className="dashboard__update" onClick={checkOut}>{loading?<><LoadingAnimation /> Processing</>:<><p>You need to Subscribe to a plan to enable feature. <strong>Click to Subscribe</strong></p></>}</button>:""}
                
            </div>
            }
        </div>    
    </div>
    </div>
  )
}

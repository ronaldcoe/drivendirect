import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { faCar, faMagnifyingGlass, faVanShuttle, faCommentsDollar, faClipboardCheck, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import '../../styles/blocks/about.css'
import carOne from '../../images/car_blue.jpg'
import carTwo from '../../images/car_2.jpg'
import carTree from '../../images/car_3.jpg'
import carFour from '../../images/car_4.jpg'
import carFive from '../../images/car_5.jpg'

import iconSearch from '../../images/icons-search.png'
import iconCar from '../../images/icons-car.png'
import iconMoney from '../../images/icons-money.png'
import iconPrice from '../../images/icons-price.png'
import iconDeal from '../../images/icons-deal.png'


import ribbonIconCar from '../../images/ribbon_icon_car.png'
import ribbonIconCarTrade from '../../images/ribbon_icon_car_trade.png'
import ribbonIconTrade from '../../images/ribbon_icon_trade.png'
import ribbonIconSearch from '../../images/ribbon_icon_search.png'
import ribbonIconHome from '../../images/ribbon_icon_home.png'
import ribbonIconComment from '../../images/ribbon_icon_comment.png'

import Testimonial from './Testimonial';


export default function About() {

    const navigate = useNavigate()


    
   


  return (
    <div className='about'>
        
        <div className='about__wrapper'>
            <div className='about__wrapper__ribbon'>
                <div className='about__wrapper__ribbon__content' onClick={()=> navigate("/inventory/listing")}>
                    <img src={ribbonIconCar} alt="" />
                    <p>What other dealers want</p>
                </div>
                <div className='about__wrapper__ribbon__content' onClick={()=> navigate("/inventory/trade")}>
                    <img src={ribbonIconCarTrade} alt="" />
                    <p>What other dealers want to trade</p>
                </div>
                <div className='about__wrapper__ribbon__content' onClick={()=> navigate("/trade")}>
                    <img src={ribbonIconTrade} alt="" />
                    <p>Trade</p>
                </div>
                <div className='about__wrapper__ribbon__content' onClick={()=> navigate("/search")}>
                    <img src={ribbonIconSearch} alt="" />
                    <p>Search</p>
                </div>
                <div className='about__wrapper__ribbon__content' onClick={()=> navigate("/")}>
                    <img src={ribbonIconHome} alt="" />
                    <p>Home</p>
                </div>
                <div className='about__wrapper__ribbon__content'>
                    <img src={ribbonIconComment} alt="" />
                    <p>Comments</p>
                </div>
             
            </div>
            
            <div className='about__wrapper__card__container' >
                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                        <h2 onClick={()=>{navigate("/inventory/trade")}}>Find what you need now!</h2>
                        <h3>Don't ever say "I don't have one!"</h3>
                        <p>
                            It's like a dealer transfer for new, except on this site it's for used!
                            Your customer is looking for a specific vehicle you don't have on your
                            lot.
                        </p>
                        <p>
                            Registered Users can show what they are looking for right here, to find
                            out if another dealer has or knows where you might find one! Chances are
                            that someone has what you are looking for and might be interested in
                            moving it from their inventory, or trading it for something you might
                            have!
                        </p>
                        <p>
                            There is a good chance that the vehicle you want is out there, and most
                            importantly, it is you who finds it for them! As well, your customer
                            isn't checking around with other dealers and you maintain control!
                        </p>
                        
                    </div>
                    <div className='about__wrapper__card__img'>
                        <img src={carOne} alt="a small blue car parked on the side of the road" loading='lazy' />
                    </div>
                </div>
                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                            <h2 onClick={()=>{navigate("/login")}}>List a vehicle to trade!</h2>
                            <h3>Save on auction fees!</h3>
                            <p>
                                Before you send it to an auction! List it here and let
                                other dealers know you want to move it and it costs far
                                less than selling it through an auction!
                            </p>
                            <p>
                                Get rid of over-age inventory and off-make trades that
                                you don't want. Remember as well that valuations can
                                differ from one region of the country to another!
                            </p>
                            <p>
                                Chances are that another dealer might be interested in
                                what you have, or in trading something with you. You
                                also save on freight charges! Dealers deal directly with
                                each other free of charge!
                            </p>
                            
                        </div>
                        <div className='about__wrapper__card__img'>
                            <img src={carTwo} alt="a blue car parked on the side of the road" loading='lazy' />
                        </div>
                </div>

                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                            <h2 onClick={()=>{navigate("/login")}}>Forget the black book!</h2>
                            <h3>Find out what a trade is really worth!</h3>
                            <p>
                                It might be a vehicle you are not familiar with but you 
                                don't want to lose the deal! List the vehicle on the 
                                website and find out what it might be worth to another
                                dealer!
                            </p>
                            <p>
                                Perhaps as a Ford dealer you have no idea what a
                                Beetle or an Audi Sport Convertible is worth. Or
                                maybe you're a BMW dealer and the customer wants to
                                trade in a Chevy Cargo Van with high mileage.
                            </p>
                            <p>
                                List it on the website for free and get responses
                                from several other dealers right away. Don't take
                                chances by risking what it might be worth, or by 
                                losing the deal or by paying way too much!
                            </p>
                            
                        </div>
                        <div className='about__wrapper__card__img'>
                            <img src={carTree} alt="a white honda cr - v parked in the snow" loading='lazy' />
                        </div>
                </div>

                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                            <h2 onClick={()=>{navigate("/inventory/trade")}}>Find commercial vehicles!</h2>
                            <h3>My customer needs a 15 passenger van!</h3>
                            <p>
                                Or maybe its a cube van or a flat deck truck? 
                                Somebody wants one and you don't have anything like
                                that! It isn't something that you carry. Do you say
                                you can't help?? You could possibly lose a deal!
                            </p>
                            <p>
                                Tell the prospect you will call them back. Then list
                                the enquiry on the website for free, and wait for a
                                response.
                            </p>
                            <p>
                                We work as well with Leasing and Rental Companies
                                and there's a good chance that the vehicle you want
                                is out there, and most importantly, it is you who
                                finds it for them! Your customer is not checking
                                around with other dealers and you maintain control!
                            </p>
                            
                        </div>
                        <div className='about__wrapper__card__img'>
                            <img src={carFour} alt="a silver van parked on the side of a road" loading='lazy'/>
                        </div>
                   
                </div>
                
            </div>
            <div className='about__wrapper__call__to__action'>
                <div className='about__wrapper__call__to__action__text'>
                    <h1>Ready to start trading?</h1>
                    <h2>Start a free trial today!</h2>
                    <button className='about__wrapper__call__to__action__text__btn' onClick={()=>{navigate("/login")}}>Start Here</button>
                </div>
                <img src={carFive} alt="a black car is parked in a parking lot" loading='lazy'/>
            </div>
            
            <div className='about__wrapper__btns'>
                <div className='about__wrapper__btns__container' onClick={()=> navigate("/inventory/trade")}>
                    <img src={iconCar}/>
                    <h2>You need it or don't?</h2>
                    <p>Find cars that you need or Sell cars that you don't need.</p>
                    
                    
                </div>
                
                <div className='about__wrapper__btns__container' onClick={()=> navigate("/login")}>
                    <img src={iconSearch}/>
                    <h2>Search or list it</h2>
                    <p>Check the inventory or list the vehicle you want to sell.</p>
                    
                    
                </div>
                
                <div className='about__wrapper__btns__container' onClick={()=> navigate("/login")}>
                    <img src={iconPrice}/>
                    <h2>Make or get offers</h2>
                    <p>You found the car you need? Contact the seller.</p>
                    
                    
                </div>
                
                <div className='about__wrapper__btns__container' onClick={()=> navigate("/login")}>
                    <img src={iconDeal}/>
                    <h2>Close the deal</h2>
                    <p>The best part? There are not commission fees.</p>
                    
                </div>
            </div>
            <Testimonial></Testimonial>
        </div>
    </div>
  )
}

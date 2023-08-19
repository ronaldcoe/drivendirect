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
                {/* <div className='about__wrapper__ribbon__content' onClick={()=> navigate("/")}>
                    <img src={ribbonIconHome} alt="" />
                    <p>Home</p>
                </div>
                <div className='about__wrapper__ribbon__content'>
                    <img src={ribbonIconComment} alt="" />
                    <p>Comments</p>
                </div> */}
             
            </div>
            
            <div className='about__wrapper__card__container' >
                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                        <h2 onClick={()=>{navigate("/inventory/trade")}}>Find What You Need Right Now!</h2>
                        <h3>Don't ever say "I don't have one!"</h3>
                        
                        <p>
                        It’s like a <strong>Dealer Trade</strong>, except on this website it’s for Used! Show others what you are looking for, then wait for a response. Chances are that another dealer has what you are looking for and might be willing to sell it to you, or trade for something that you have. Most importantly you maintain control, and your customer isn’t checking around with other dealers!
                        </p>
                      
                        
                    </div>
                    <div className='about__wrapper__card__img'>
                        <img src={carOne} alt="a small blue car parked on the side of the road" loading='lazy' />
                    </div>
                </div>
                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                            <h2 onClick={()=>{navigate("/login")}}>List a Vehicle You Want to Trade!</h2>
                            <h3>Save on auction fees!</h3>
                            
                            <p>
                            Before sending it to an auction, list it here! Let other dealers know what you have to sell.
                            It costs less than the auction, and it’s faster! 
                            </p>
                            
                        </div>
                        <div className='about__wrapper__card__img'>
                            <img src={carTwo} alt="a blue car parked on the side of the road" loading='lazy' />
                        </div>
                </div>

                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                            <h2 onClick={()=>{navigate("/login")}}>Forget About the <strong>Black Book!</strong></h2>
                            <h3>Find Out What Another Dealer Will Pay!</h3>
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
                        Maybe it’s a cube van or a flat deck truck.  A customer needs one but you don’t have one in stock. 
                        List it here for free! Somebody likely has one, but we also deal with leasing companies and rental 
                        companies and there’s a chance that they can help as well. 
                        </p>
                        <p>
                        Or maybe its another make and its brand new? Maintain control and find it here. Don’t take chances 
                        and lose your customer to another dealer! 
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
            
            {/* <div className='about__wrapper__btns'>
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
            </div> */}
            <Testimonial></Testimonial>
        </div>
    </div>
  )
}

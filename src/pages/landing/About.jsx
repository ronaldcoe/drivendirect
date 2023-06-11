import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMagnifyingGlass, faVanShuttle, faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import '../../styles/blocks/about.css'
import carOne from '../../images/car_blue.jpg'
import carTwo from '../../images/car_2.jpg'
import carTree from '../../images/car_3.jpg'
import carFour from '../../images/car_4.jpg'
import carFive from '../../images/car_5.jpg'



export default function About() {
  return (
    <div className='about'>
        
        <div className='about__wrapper'>
            
           
            <div className='about__wrapper__card__container'>
                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                        <h2>FIND WHAT YOU NEED NOW!</h2>
                        <h3>DON'T EVER SAY "I DON'T HAVE ONE!</h3>
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
                        <img src={carOne} alt="Car picture" />
                    </div>
                </div>
                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                            <h2>LIST A VEHICLE TO TRADE!</h2>
                            <h3>SAVE ON AUCTION FEES!</h3>
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
                            <img src={carTwo} alt="Car picture" />
                        </div>
                </div>

                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                            <h2>FORGET THE BLACK BOOK!</h2>
                            <h3>FIND OUT WHAT A TRADE IS REALLY WORTH!</h3>
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
                            <img src={carTree} alt="Car picture" />
                        </div>
                </div>

                <div className='about__wrapper__card'>
                    <div className='about__wrapper__card__text'>
                            <h2>FIND COMMERCIAL VEHICLES!!</h2>
                            <h3>MY CUSTOMER NEEDS A 15 PASSENGER VAN!</h3>
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
                            <img src={carFour} alt="Car picture" />
                        </div>
                   
                </div>
                
            </div>
            <div className='about__wrapper__call__to__action'>
                <div className='about__wrapper__call__to__action__text'>
                    <h1>Ready to start trading?</h1>
                    <h2>Start a free trial today!</h2>
                    <button className='about__wrapper__call__to__action__text__btn'>START HERE</button>
                </div>
                <img src={carFive} alt="Car picture" />
            </div>
        </div>
    </div>
  )
}

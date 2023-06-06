import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMagnifyingGlass, faVanShuttle, faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import '../../styles/blocks/about.css'


export default function About() {
  return (
    <div className='about'>
        <div className='about__wrapper'>
            <div className='about__wrapper__description'>
                <h1>
                    How does it work?
                </h1>
                
                
            </div>
            <div className='about__wrapper__card__container'>
                <div className='about__wrapper__card'>
                    <details>
                        <summary>
                            <div><FontAwesomeIcon className="about__wrapper__card__icon" icon={faMagnifyingGlass} /></div>
                            <h2>Find what you need now!</h2>
                        </summary>
                        <p>
                        It's like a used car dealer transfer. Your customer is looking for a specific vehicle you don't have. Registered Users can post their requests here to see if another dealer has or knows where to find one. It's a chance for dealers to move or trade vehicles. The vehicle you want might be out there, and you can be the one to find it for your customer while maintaining control.
                        </p>

                    </details>
                    
                    <div>
                        
                       
                    </div>
                </div>
                <div className='about__wrapper__card'>
                    <FontAwesomeIcon className="about__wrapper__card__icon" icon={faCar} />
                    <div>
                        <h2>List a vehicle to trade!</h2>
                        <p>
                            
                        List your vehicles here before sending them to an auction! Let other dealers know you want to move them at a lower cost than auction selling. Clear out over-age inventory and unwanted off-make trades. Keep in mind that valuations can vary across regions. There's a good chance another dealer may be interested in your vehicles or willing to trade. Plus, you save on freight charges by dealing directly with other dealers for free!
                        </p>
                    </div>
                </div>
                <div className='about__wrapper__card'>
                    <FontAwesomeIcon className="about__wrapper__card__icon" icon={faCommentsDollar} />
                    <div>
                        <h2>Forget the black book</h2>
                        <p>
                        List unfamiliar vehicles on the website to determine their value to other dealers. Whether it's a Beetle or an Audi Sport Convertible as a Ford dealer, or a Chevy Cargo Van with high mileage as a BMW dealer, avoid the risk of not knowing its worth or losing the deal. List it for free and receive quick responses from multiple dealers. Don't take chances on valuation or paying too much—let the website help you secure the best deal.

                        </p>
                    </div>
                </div>

                <div className='about__wrapper__card'>
                    <FontAwesomeIcon className="about__wrapper__card__icon" icon={faVanShuttle} />
                    <div>
                        <h2>Find commercial vehicles</h2>
                        <p>
                        Don't miss out on deals even if you don't have the specific vehicle like a cube van or a flat deck truck. Instead of saying you can't help, inform the prospect that you'll call them back. Then, list their enquiry on the website for free and await responses. We also collaborate with Leasing and Rental Companies, increasing the chances of finding the desired vehicle. Take control of the situation and be the one to find it for your customer, preventing them from searching elsewhere.
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

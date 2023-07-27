import React from 'react'
import '../../styles/blocks/testimonial.css'
import George from '../../images/george_2_100x95.jpg'

export default function Testimonial() {
  return (
    <div className='testimonial'>
        <div className='testimonial__wrapper'>
            <div className='testimonial__wrapper__text'>
            

                <div className='testimonial__wrapper_header'>
                  <img src={George} alt='Profile picture of George'/>
                  <div>                    
                    <h2>George Shaw</h2>
                    <p>g.shaw@shaw.ca</p>
                  </div>
                </div>
                <div className='testimonial__text__columns'>
                  <div>
                    <p>
                    My name is George Shaw. I started in the automotive business selling new and used vehicles in Canada in 1975. 
                    After a year of university, I needed to find a job so as to be able to support my family while going back to school.  
                    So I started in the automotive business selling cars, and never did go back, and 48 years later, after having had a 
                    successful career on the sales floor, selling cars and trucks, I retired and then went back to school. 
                    </p>
                    <p>
                    Back then I studied accounting, but now I am studying Website Design and Data Management, and with the encouragement 
                    and help from some great individuals, including my wife, and with 46 years of experience on the sales floor, I have 
                    developed this website to help dealers and salespeople sell more vehicles. 
                    </p>
                    <p>
                    Back then I studied accounting, but now I am studying Website Design and Data Management, and with the encouragement 
                    of some great individuals including my wife and with 46 years of experience selling cars and trucks I have developed
                    this website to help dealers sell more vehicles.
                    </p>
                    <p>
                    During all of those 46 years I remained one of the top salespeople in Canada for Ford Motor Company, but I also sold 
                    almost every other make of vehicle there was!  While working as a new vehicle salesperson most of my earnings came from 
                    selling used. These were mostly vehicles that I acquired on my own from other dealers and from every other source that 
                    I could find. 
                    </p>
                  </div>
                  <div>
                    <p>
                    So, instead of telling prospects that I didn’t have one, I would ask if I could call them back, and that I knew where I 
                    might find the vehicle they needed, and then immediately I would email 30 or 40 other dealers and ask them if they had one. 
                    </p>
                    <p>
                    Often they had, and we’d figure out a price that I could buy it for, and then I’d call the prospect back.  Most times 
                    I would make the deal and while working as a new vehicle salesperson selling mostly to fleets and selling new, I also made 
                    a lot of money selling used, and the dealerships I worked for did as well! 
                    </p>
                    <p>
                    In a few months’ time I’ll be 80 years of age, but this is the legacy I wish to leave behind, suggesting to dealers that 
                    by working directly with each other and avoiding auction fees, they can do the same. This website I’ve developed will help 
                    your salespeople sell more vehicles and keep customers at your dealership where they belong!  
                    </p>
                  </div>
                </div>
                
                
            </div>
        </div>
    </div>
  )
}

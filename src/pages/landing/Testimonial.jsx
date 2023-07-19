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
                <p>
                My name is George Shaw.  I started in the automotive business selling new and used vehicles in Calgary, Alberta in 1975. After having completed just a year of university, I needed to find a job so as to be able to go back to school and finish my degree, but being married with a family made things more of a dream than a reality.
                </p>
                <p>
                Now, 48 years later, after having had a successful career selling cars and light trucks, I retired and went back to school to finish my degree.
                </p>
                <p>
                Back then I studied accounting, but now I am studying Website Design and Data Management, and with the encouragement of some great individuals including my wife and with 46 years of experience selling cars and trucks I have developed this website to help dealers sell more vehicles.
                </p>
                <p>
                During those 46 years I sold new Fords, but I also sold almost every other make of vehicle there was, because when past customers or prospects would phone, instead of telling them I had nothing like they wanted I would tell them I would check and call them back, and immediately I would email 30 or 40 other dealers to find out if they could help.
                </p>
                <p>
                Most often another dealer had what I needed and then together we would figure out a price I could buy it for and then I would phone my customer and tell them what I had, and what they would have to pay for it and I usually made the deal.  Such can be verified by the dealership I worked for, but in one year for example, in 2016, while working as a New Vehicle Salesperson and focusing on selling new, I also sold 92 used vehicles, 70 of which I acquired from other dealers.
                </p>
                <p>
                Other years for me were much the same, but while working as a new vehicle salesperson selling mostly to fleets, I also made a lot of money selling used, and the dealerships I worked for did as well!
                </p>
            </div>
        </div>
    </div>
  )
}

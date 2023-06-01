import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMagnifyingGlass, faHandshake } from '@fortawesome/free-solid-svg-icons';
import '../../styles/blocks/about.css'


export default function About() {
  return (
    <div className='about'>
        <div className='about__wrapper'>
            <div className='about__wrapper__description'>
                <h2>
                    How does it work?
                </h2>
                <p>
                Revolutionize your dealership with our app for 
                hassle-free wholesale vehicle trading. Connect, 
                negotiate, and maximize profit potential effortlessly. 
                Join us now and elevate your business to new heights.
                </p>
                
            </div>
            <div className='about__wrapper__card__container'>
                <div className='about__wrapper__card'>
                    <FontAwesomeIcon className="about__wrapper__card__icon" icon={faCar} />
                    <div>
                        <h3>List a car</h3>
                        <p>
                            You have a car that you don’t need
                            Post it so others can see it and contact you
                        </p>
                    </div>
                </div>
                <div className='about__wrapper__card'>
                    <FontAwesomeIcon className="about__wrapper__card__icon" icon={faMagnifyingGlass} />
                    <div>
                        <h3>Search Cars</h3>
                        <p>
                            You need a car asap? Create a post so others
                            can see it, or check the inventory.
                        </p>
                    </div>
                </div>
                <div className='about__wrapper__card'>
                    <FontAwesomeIcon className="about__wrapper__card__icon" icon={faHandshake} />
                    <div>
                        <h3>Refer customers</h3>
                        <p>
                            Never say no to a customer. Help them find the
                            car they need and you may get a comission.
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

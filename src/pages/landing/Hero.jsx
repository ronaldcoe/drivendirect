import React from 'react'
import { useNavigate } from 'react-router';
import '../../styles/blocks/hero.css'
import carIllustration from "../../images/car_illustration.svg"
import carIllustration2 from "../../images/car_illustration2.svg"
import carbanner from "../../images/car_banner.jpg"
import carbanner2 from "../../images/car_banner2.jpg"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Hero() {

  const navigate = useNavigate()


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 5000,
    prevArrow: <></>,
    nextArrow: <></>,
  }

  return (
    <div className='hero'>
        <div className='hero__wrapper'>
          {/* <div className='hero__call_to_action'>
              <h1>
              Helping Dealers
              </h1>
              <h1>
              Help each other
              </h1>
              <button className='hero__call_to_action_primarybutton' onClick={()=>{navigate("/login")}}>Start Today</button>
            
          </div> */}


          {/* New Banner */}
          <Slider {...settings}>
                    <div className='hero__wrapper__banner'>
                        <div className='hero__wrapper__banner__content'>
                            <div className='hero__wrapper__banner__content__description'>
                                
                                <h3>List Vehicles you need!</h3>
                                <p>A new and better way to find and trade vehicles.</p>
                                
                            </div>
                            <div className='hero__wrapper__banner__images'>
                                <img src={carbanner} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='hero__wrapper__banner' >
                        <div className='hero__wrapper__banner__content'>
                                <div className='hero__wrapper__banner__content__description'>
                                    
                                    <h3>See what other dealers want!</h3>
                                    <p>A new and better way to find and trade vehicles.</p>
                                    
                                </div>
                                <div className='hero__wrapper__banner__images'>
                                    <img src={carbanner2} alt="" />
                                </div>
                        </div>
                    </div>
                </Slider>
          
        </div>
    </div>
  )
}

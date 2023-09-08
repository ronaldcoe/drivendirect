import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import '../../styles/blocks/hero.css'
import carIllustration from "../../images/car_illustration.svg"
import carIllustration2 from "../../images/car_illustration2.svg"
import carbanner from "../../images/car_banner.jpg"
import carbanner2 from "../../images/car_banner2.jpg"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { planPerUser } from '../../Firebase/FirebaseStateManagement';
export default function Hero() {

  const navigate = useNavigate()
  const fecthData = async()=>{
    const data = await planPerUser("YqhmLvrbS0M2Dt0firwm8LhhBbE3")
    console.log(data)
  }

    useEffect(()=>{
        fecthData()
    }, [])

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
          {/* New Banner */}
          <Slider {...settings}>
                    <div className='hero__wrapper__banner'>
                        <div className='hero__wrapper__banner__content'>
                            <div className='hero__wrapper__banner__content__description'>
                                
                                <h3>Helping Dealers Help Each Other!</h3>
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

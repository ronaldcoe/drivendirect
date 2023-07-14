import React from 'react'
import '../../styles/blocks/footer.css'

export default function Footer() {

    let footerDate = new Date()
  return (
    <div className='footer'>
        <div className='footer__wrapper'>
            <div className='footer__wrapper__about'>
                <h3>Abouts Us</h3>
                <p>Revolutionize your dealership with our app for hassle-free wholesale vehicle trading. Connect, negotiate, and maximize profit potential effortlessly. Join us now and elevate your business to new heights.</p>
            </div>
            <div className='footer__wrapper__quicklinks'>
                <h3>Quick Links</h3>
                <ul>
                    <li><a href='/faq'>FAQ</a></li>
                    <li><a href='/'>Contact us</a></li>
                    <li><a href='/privacy-policy'>Privacy Policy</a></li>
                </ul>
            </div>
            <p  className='footer__wrapper__copyright'>&#169;{footerDate.getFullYear()} All rights reserved | Carznot&trade;</p>
            

        </div>
        <a href="https://storyset.com/happy" className='credits'>Happy illustrations by Storyset</a>
    </div>
  )
}

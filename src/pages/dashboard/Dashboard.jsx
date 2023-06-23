import React from 'react'
import '../../styles/blocks/dashboard.css'

export default function Dashboard() {
  return (
    <div className='dashboard'>
        <div className='dashboard__wrapper'>
            <div className='dashboard__wrapper_col_1'>
                <div className='dashboard__wrapper__profile'>
                    <div className='dashboard__wrapper__profile__picture'>
                        RC
                    </div>
                    <div className='dashboard__wrapper__profile__info'>
                        <h2>Ryan Smith</h2>
                        <h3>Contact Information</h3>
                        <p>Ryan's car</p>
                        <p>ryanscar@gmail.com</p>
                        <p>www.ryancars.com</p>
                        <p>+1 208 345 6789</p>

                        <h3>Location</h3>
                        <p>Idaho Falls</p>
                        <p>Idaho</p>
                        <p>USA</p>
                    </div>
            </div>
        </div>
        <div className='dashboard__wrapper_col_2'>
            <div className='dashboard__wrapper__section'>

            </div>
        </div>
        <div className='dashboard__wrapper_col_3'>
            <div className='dashvoard__section'>

            </div>
        </div>
    </div>
    </div>
  )
}

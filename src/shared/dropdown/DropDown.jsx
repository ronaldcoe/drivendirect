/*
============================== DROPDOWN MENU ==============================
This component serves as a replacement for the <select> tag, offering
enhanced customization options. Unlike the <select> tag, which has
limitations in terms of appearance across different devices, our
custom dropdown menu provides better control over its visual presentation.

This component accepts four props:

- initial: Represents the initial option. This prop is optional, and the 
component checks for the presence of an initial value.
- selectedOption: Maintains the state of the dropdown menu and determines
the currently selected option. This will stored in an useState hook in the
caller component
- setSelectedOption: A setter method used to update the dropdown menu's
state by modifying the selectedOption value. This will stored in an useState 
hook in the caller component
- data: An array of options to be displayed when the dropdown menu is open.
===========================================================================
*/


import React, { useState, useEffect } from 'react'
import arrow from '../../images/expand-arrow.png'

export default function DropDown(props) {

    const [isOpen, setIsOpen] = useState(false);
    
    const { initial, selectedOption, setSelectedOption, data } = props
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    const handleChange = (event) => {
      event.preventDefault()
        const selectedOption = event.target.textContent;
      
        setSelectedOption(selectedOption);
        setIsOpen(!isOpen)
        
    };

 
  

   
  return (
    <div className="custom-dropdown">
        <button type='button' className="dropdown-header" onClick={()=>toggleDropdown()}>
            {selectedOption?selectedOption:'Select'} 
            <img className="dropdown-header__arrow" src={arrow} alt="arrow"/>
        </button>
            {isOpen && (
            <ul className="dropdown-list">
             
                {initial !== undefined?<li onClick={handleChange}>{initial}</li>:''}
                {data !== undefined? data.map((item)=> {
                    return (
                    <li onClick={handleChange} key={item}>{item}</li>
                    )
                }):''}

            </ul>
            )}
            
    </div>
  )
}

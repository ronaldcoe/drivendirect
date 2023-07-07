import React, { useState, useRef, useEffect } from 'react';
import '../../styles/blocks/card.css';
import menu from '../../images/menu_dots.svg';
import { ReactSVG } from 'react-svg';
import { updateInventoryRecord } from '../../Firebase/FirebaseStateManagement';

export default function Card({ car, onClick, isSelected, type, onUpdate , update}) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  // This Handle the Update on the Status as Sold or Found
  const changeStatus =async(type, car)=>{
    var updatedCar={}
    if(type == "listing"){
      updatedCar={
        ...car,
        status: "Found"
     }
    }
    if(type =="trade"){
      updatedCar={
        ...car,
        status: "Sold"
     }
    }
    // Make the update
    console.log("Starting to update")
    await updateInventoryRecord(car.id, updatedCar, type)
    onUpdate(!update)
    
    }

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);


  return (
    <div className='vehiclecard' onClick={onClick}>
      <div className='vehiclecard__title'>
        <h3>{car.year} {car.make} {car.model}</h3>

        <div className='vehiclecard__title__options'>
          <ReactSVG src={menu} className='menu' onClick={() => { setShowOptions(!showOptions) }} />
          {showOptions && (
            <div ref={optionsRef} className='options'>
              <ul>
                <li><a>Edit</a></li>
                { type == "listing"?<li><a onClick={()=>changeStatus("listing", car)}>Mark as Found</a></li>:<li><a onClick={()=>changeStatus("trade", car)} >Mark as Sold</a></li>}
                
                <li><a>Delete</a></li>
              </ul>
            </div>
          )}
        </div>

      </div>

      <div className='vehiclecard__description'>
        {car.description}
      </div>

    </div>
  );
}

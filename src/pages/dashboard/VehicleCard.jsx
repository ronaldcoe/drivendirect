import React, { useState, useRef, useEffect } from 'react';
import '../../styles/blocks/card.css';
import menu from '../../images/menu_dots.svg';
import { ReactSVG } from 'react-svg';

export default function Card({ car, onClick, isSelected, type }) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

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
                { type == "list"?<li><a>Mark as Found</a></li>:<li><a>Mark as Sold</a></li>}
                
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

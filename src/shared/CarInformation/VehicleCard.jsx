
import React from 'react';
import '../../styles/blocks/card.css';

export default function Card({ car, onClick, isSelected }) {
  return (
    <div className={`vehiclecard`} onClick={onClick}>
      <div className='vehiclecard__title'>
        <h3>{car.year} {car.make} {car.model}</h3>
        <p>{car.location}</p>
      </div>
      {isSelected && (
        <div className='vehiclecard__description'>
          {car.description}
        </div>
      )}
    </div>
  );
}

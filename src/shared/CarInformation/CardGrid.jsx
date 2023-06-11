// CardGrid.js
import React, { useState } from 'react';
import data from './car-data.json';
import VehicleCard from '../../shared/CarInformation/VehicleCard';
import '../../styles/blocks/cardGrid.css';

export default function CardGrid() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
  };

  return (
    <div className='cardGrid'>
      {data.map((item, index) => (
        <VehicleCard
          car={item}
          key={index}
          onClick={() => handleCardClick(index)}
          isSelected={index === selectedCardIndex}
          
        />
      ))}
    </div>
  );
}

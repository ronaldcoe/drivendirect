// CardGrid.js
import React, { useState } from 'react';
import data from './car-data.json';
import VehicleCard from '../../shared/CarInformation/VehicleCard';
import '../../styles/blocks/cardGrid.css';

export default function CardGrid() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const [yearFilter, setYearFilter] = useState('');
  const [makeFilter, setMakeFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');

  const handleCardClick = (index) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
  };


  const vehicles = {
    Hyundai: ["Santa Fe", "Tucson", "Accent"],
    Toyota: ["Camry", "Corolla", "RAV4"],
    Ford: ["Mustang", "F-150", "Focus"],
    Honda: ["Civic", "Accord", "CR-V"],
    Chevrolet: ["Silverado", "Equinox", "Cruze"],
  };
{/* {data.map((item, index) => (
        <VehicleCard
          car={item}
          key={index}
          onClick={() => handleCardClick(index)}
          isSelected={index === selectedCardIndex}
          
        />
      ))} */}
  return (
    <div className='cardGrid'>
      <div className='cardGrid__wrapper'>
        
        <div>
          <div className='cardGrid__description'>
            <h1>Search Inventory</h1>
            <div className='cardGrid__filters'>
              <label>
              
                <select required onChange={(e)=>{setMakeFilter(e.target.value)}}>
                  <option value=''>Select a Make</option>
                        {Object.keys(vehicles).map((make)=> {
                          return (
                            <option value={make} key={make}>{make}</option>
                          )
                        })}
                        <option value='other'>Other</option>
                </select>
                </label>
                <hr />
                <label>
                
                      {makeFilter !== 'other'? 
                        <select required onChange={(e)=>{setModelFilter(e.target.value)}}>
                        <option value=''>Select a Model</option>
                        {makeFilter !== "" ? vehicles[makeFilter].map((model)=>{
                          return (
                            <option value={model} key={model}>{model}</option>
                          )
                        }):'' }
                  </select>:<input type='text' placeholder='Type in the Model' required onChange={(e)=>{setModelFilter(e.target.value)}}></input>
                      }
              </label>
            </div>
          
          </div>
        </div>
        

        <table role='presentation'>
          <thead>
            <tr>
              <td>Year</td>
              <td>Make</td>
              <td>Model</td>
              <td>Region</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
          {data
            .filter(item =>  item.year.toString().includes(yearFilter))
            .filter(item => item.make.includes(makeFilter))
            .filter(item => item.model.includes(modelFilter))
            .map((item, index) => {
            return(
              <tr>
              
                
                <td id='table_year'>{item.year}</td>
                <td id='table_make'>{item.make}</td>
                <td id='table_model'>{item.model}</td>
                <td id='table_location'>{item.location}</td>
                
                <td id='table_description'>{item.description}</td>
                <td id='table_actions'>
                  <button>Contact</button>
                  <button id='table_actions_save'>Save</button>
                </td>
              </tr>
            )
          })}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

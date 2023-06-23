// CardGrid.js
import React, { useEffect, useState } from 'react';
import data from './car-data.json';
import '../../styles/blocks/cardGrid.css';
import DropDown from '../dropdown/DropDown';
import { getVehicles } from '../../Firebase/FirebaseStateManagement';


export default function CardGrid() {


  const [yearFilter, setYearFilter] = useState('');
  const [makeFilter, setMakeFilter] = useState('All');
  const [modelFilter, setModelFilter] = useState('All');
  const [dataVehicles, setDataVehicles] = useState(null)
  



  
  const [makes, setMakes] = useState(undefined)
  const [models, setModels] = useState(undefined)

  // Get Static Data
  const fetchdata=async()=>{
    const vehicles = await getVehicles()
    setDataVehicles(vehicles)
    
    
    
  }

  useEffect(()=> {
    fetchdata()

    
  },[])

  useEffect(()=> {
    if (dataVehicles) {
      setMakes(Object.keys(dataVehicles[0]).sort())
      
 
    }
   
  },[dataVehicles])


  useEffect(()=> {
    setModelFilter("All")
    if (dataVehicles) {
      setModels(dataVehicles[0][makeFilter])
    }
    
  },[makeFilter])
 
  return (
    <div className='cardGrid'>
      <div className='cardGrid__wrapper'>
        
        <div>
          <div className='cardGrid__description'>
            <h1>Search Inventory</h1>
            <div className='cardGrid__filters'>
              <label>
                <p>Make</p>

                <DropDown initial="All" selectedOption={makeFilter} setSelectedOption={setMakeFilter} data={makes}/>



                </label>
     
               
              <label>
                <p>Model</p>

                <DropDown initial="All" selectedOption={modelFilter} setSelectedOption={setModelFilter} data={models}/>


                </label>
     
                <label>
                
                   


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
            
            .filter(item => makeFilter === 'All' ? true :item.make.includes(makeFilter))
            .filter(item => modelFilter === 'All'? true :item.model.includes(modelFilter))
            .map((item, index) => {
            return(
              <tr key={index}>
              
                
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

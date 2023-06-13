import React, { useState } from 'react'
import '../../styles/blocks/add_vehicle.css'

export default function AddVehicle() {



  // Will move this over the database. Just testing
  const vehicles = {
    Hyundai: ["Santa Fe", "Tucson", "Accent"],
    Toyota: ["Camry", "Corolla", "RAV4"],
    Ford: ["Mustang", "F-150", "Focus"],
    Honda: ["Civic", "Accord", "CR-V"],
    Chevrolet: ["Silverado", "Equinox", "Cruze"],
  };

  // Data
  const [makeSelected, setMakeSelected] = useState('')
  const [modelSelected, setModelSelected] = useState('')
  const [vehicleYear, setVehicleYear] = useState('')
  const [vehicleDescription, setVehicleDescription] = useState('')

  
  return (
    <div className='addVehicle'>
      <div className='addVehicle__wrapper'>
        <div className='addVehicle__wrapper__description'>
          <h1>List a Vehicle to Trade</h1>
          <p className='addVehicle__wrapper__form__important'>
          IMPORTANT: This service is intended for the use of management personnel only. It should only be used for specific vehicles that a dealer wants to move out of inventory or trade for a different type of vehicle. It is NOT INTENDED as a means for dealers or sales personnel to sell retail units at retail prices to other dealers. Should any dealer begin listing retail inventory at retail prices your ability to list further vehicles will be terminated.
          </p>
        </div>
        <div className='addVehicle__wrapper__form'>
          <form>
            <label>
              <p>Make</p>
              <select required onChange={(e)=>{setMakeSelected(e.target.value)}}>
                <option value=''>Select a Make</option>
                {Object.keys(vehicles).map((make)=> {
                  return (
                    <option value={make} key={make}>{make}</option>
                  )
                })}
                <option value='other'>Other</option>
              </select>
            </label>
            <label>
              <p>Model</p>
              {makeSelected !== 'other'? 
                <select required onChange={(e)=>{setModelSelected(e.target.value)}}>
                <option value=''>Select a Model</option>
                {makeSelected !== "" ? vehicles[makeSelected].map((model)=>{
                  return (
                    <option value={model} key={model}>{model}</option>
                  )
                }):'' }
              </select>:<input type='text' placeholder='Type in the Model' onChange={(e)=>{setModelSelected(e.target.value)}}></input>
              }
            </label>
            <label>
              <p>Year</p>
              <input type="text" required pattern='\d{4}' onChange={(e)=>{setVehicleYear(e.target.value)}}/>
            </label>
            <label>
              <p>Description</p>
              <textarea name="" id="" cols="30" rows="5" maxLength={120} onChange={(e)=>{setVehicleDescription(e.target.value)}}></textarea>
            </label>
            <button type='submit'>List Vehicle</button>
          </form>
          
        </div>
      </div>
    </div>
  )
}

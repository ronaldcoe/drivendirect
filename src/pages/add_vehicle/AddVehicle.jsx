import React, { useEffect, useState } from 'react'
import '../../styles/blocks/add_vehicle.css'
import { createInventory } from '../../Firebase/FirebaseStateManagement';
import { auth } from '../../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router';


export default function AddVehicle() {
  // Will move this over the database. Just testing
  const vehicles = {
    Hyundai: ["Santa Fe", "Tucson", "Accent"],
    Toyota: ["Camry", "Corolla", "RAV4"],
    Ford: ["Mustang", "F-150", "Focus"],
    Honda: ["Civic", "Accord", "CR-V"],
    Chevrolet: ["Silverado", "Equinox", "Cruze"],
  };
  // For Authorization and Navigation
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // Data
  const [makeSelected, setMakeSelected] = useState('')
  const [modelSelected, setModelSelected] = useState('')
  const [vehicleYear, setVehicleYear] = useState('')
  const [vehicleDescription, setVehicleDescription] = useState('')

  const createVehicleTrade = async(e)=>{
    e.preventDefault();
    // Create the Object to save
    const currentDate = new Date();
    const vehicleObject={
      userId:localStorage.getItem("userId"),
      make: makeSelected,
      model: modelSelected,
      year: vehicleYear,
      description: vehicleDescription,
      status: "Publish",
      type: "trade",
      dateCreate: currentDate
    }
    const res = await createInventory(vehicleObject)
    if(res){
      console.log("Vehicle was created and Publish")
    }
    else(
      console.log("Vehicle was not created")
    )
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        navigate('/login');
      }});

      return () => unsubscribe(); 
  }, [])
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
          <form onSubmit={createVehicleTrade}>
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

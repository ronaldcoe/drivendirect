import React, { useEffect, useState } from 'react'
import '../../styles/blocks/add_vehicle.css'
import { createInventory } from '../../Firebase/FirebaseStateManagement';
import { auth } from '../../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router';
import DropDown from '../../shared/dropdown/DropDown';
import { getVehicles } from '../../Firebase/FirebaseStateManagement';

export default function AddVehicle(props) {

  // For Authorization and Navigation
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // Data
  const [makeSelected, setMakeSelected] = useState('')
  const [modelSelected, setModelSelected] = useState('')
  const [vehicleYear, setVehicleYear] = useState('')
  const [vehicleDescription, setVehicleDescription] = useState('')
  const [type, setType]= useState(props.type)


  // Data for Dropdown
  const [dataVehicles, setDataVehicles] = useState(null)
  const [makes, setMakes] = useState(undefined)
  const [models, setModels] = useState(undefined)
  console.log(makeSelected)

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
      type: type,
      dateCreate: currentDate
    }
    const res = await createInventory(vehicleObject)
    if(res){
      console.log("Vehicle was created and Publish")
      navigate("/dashboard")
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
    setModelSelected('')
    if (dataVehicles) {
      setModels(dataVehicles[0][makeSelected])
    }
    
  },[makeSelected])


  return (
    <div className='addVehicle'>
      <div className='addVehicle__wrapper'>
        <div className='addVehicle__wrapper__description'>
          <h1>List a Vehicle to {props.type}</h1>
          <p className='addVehicle__wrapper__form__important'>
          IMPORTANT: This service is intended for the use of management personnel only. It should only be used for specific vehicles that a dealer wants to move out of inventory or trade for a different type of vehicle. It is NOT INTENDED as a means for dealers or sales personnel to sell retail units at retail prices to other dealers. Should any dealer begin listing retail inventory at retail prices your ability to list further vehicles will be terminated.
          </p>
        </div>
        <div className='addVehicle__wrapper__form'>
          <form onSubmit={createVehicleTrade}>
            <label>
              <p>Make</p>
              
              <DropDown initial="Other" selectedOption={makeSelected} setSelectedOption={setMakeSelected} data={makes}/>

              
              {makes && !makes.includes(makeSelected) &&makeSelected !== ''?
              <input required style={{marginTop:'20px'}} type='text' placeholder='Type in the Make' onChange={(e)=>{setMakeSelected(e.target.value)}}/>             
              :null
              }
              
            </label>
            <label>
              <p>Model</p>
    
              {makes && !makes.includes(makeSelected)?
              <input required  type='text' placeholder='Type in the Model' onChange={(e)=>{setModelSelected(e.target.value)}}/>             
              : <DropDown initial="Other" selectedOption={modelSelected} setSelectedOption={setModelSelected} data={models}/>
              }
            </label>
            <label>
              <p>Year</p>
              <input type="text" required pattern='\d{4}' onChange={(e)=>{setVehicleYear(e.target.value)}}/>
            </label>
            <label>
              <p>Description</p>
              <textarea name="" id="" cols="30" rows="5" maxLength={120} required onChange={(e)=>{setVehicleDescription(e.target.value)}}></textarea>
            </label>
            <button type='submit'>List Vehicle</button>
          </form>
          
        </div>
      </div>
    </div>
  )
}

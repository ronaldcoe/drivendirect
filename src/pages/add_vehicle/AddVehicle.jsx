import React, { useEffect, useState } from 'react'
import '../../styles/blocks/add_vehicle.css'
import { createInventory, getAllInventoryByEntity } from '../../Firebase/FirebaseStateManagement';
import { auth } from '../../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router';
import DropDown from '../../shared/dropdown/DropDown';
import { getVehicles } from '../../Firebase/FirebaseStateManagement';


import { Store } from 'react-notifications-component';




export default function AddVehicle(props) {
  const navigate = useNavigate();
  // Data
  const [makeSelected, setMakeSelected] = useState('')
  const [modelSelected, setModelSelected] = useState('')
  const [vehicleYear, setVehicleYear] = useState('')
  const [vehicleDescription, setVehicleDescription] = useState('')
  const [type, setType]= useState(props.type)
  // this will be set in the future by the account details
  const [userMax, setUserMax] = useState(2)


  // Data for Dropdown
  const [dataVehicles, setDataVehicles] = useState(null)
  const [makes, setMakes] = useState(undefined)
  const [models, setModels] = useState(undefined)

  // Function to make sure we're not sending incorrect data
  const checkData = () => {
    let errors = []
    
    let makeSelectedError = makeSelected === "" || makeSelected === "Other"
    makeSelectedError && errors.push("You need to provide a Make")

    let modelSelectedError  = modelSelected === ""
    modelSelectedError && errors.push("You need to provide a Model")

    let vehicleYearError  = vehicleYear === "" || parseInt(vehicleYear) !== NaN
    vehicleYearError && errors.push("You need to provide a valid Year")

    let vehicleDescriptionError  = vehicleDescription === "" 
    vehicleDescriptionError && errors.push("You need to provide a description")

    return errors
  }

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
      dateCreate: currentDate,
      region: localStorage.getItem("region")
    }

 

    let errors = checkData()

    if (errors) {
      errors.forEach((error) => {
        Store.addNotification({
          title: "Error",
          message: error,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeInDown"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            showIcon: true
          }
        })
      })
    } 
    
    

      
      if(errors.length === 0){
        const res = await createInventory(vehicleObject)
        if (res) {
          navigate("/dashboard")
        
          Store.addNotification({
            title: "Success",
            message: "Your vehicle was sucessfully added",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeInDown"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              showIcon: true
            }
          });
        } else {
          Store.addNotification({
            title: "Error",
            message: "There was an issue when adding the vehicle",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeInDown"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              showIcon: true
            }
          })
        }
        
  
      }
      
  }



  // Get all search or trade for a user
  const fetchAllInventoryCreated = async()=>{
    const userId = localStorage.getItem("userId")
    const listOfInventory = await getAllInventoryByEntity("userId", userId, type)
    // now check if it has exceed the limit and push them back to the Dashboard
    if(listOfInventory?.length >= userMax){
      // Show messsage user can't add more vehicles
      Store.addNotification({
        title: "Notification",
        message: "You can't add more vehicles",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeInDown"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          showIcon: true
        }
      });
      navigate("/dashboard")
    }
  }
   // Get Static Data
  const fetchdata=async()=>{
  const vehicles = await getVehicles()
  setDataVehicles(vehicles)
       
  }

  useEffect(()=> {
    fetchAllInventoryCreated()
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
          IMPORTANT: This service is for management personnel only. Use it for specific vehicles the dealer wants to move or trade. It's NOT for selling retail units at retail prices to other dealers. Listing retail inventory at retail prices will result in termination of your ability to list more vehicles.
          </p>
        </div>
        <div className='addVehicle__wrapper__form'>
          <form onSubmit={createVehicleTrade}>
            <label>
              <p>Make </p>
              
              <DropDown initial="Other" selectedOption={makeSelected} setSelectedOption={setMakeSelected} data={makes}/>

              
              {makes && !makes.includes(makeSelected) &&makeSelected !== ''?
              <input required style={{marginTop:'20px'}} type='text' placeholder='Type in the Make' onChange={(e)=>{setMakeSelected(e.target.value)}}/>             
              :null
              }
             <a className='addVehicle__other'>I don't see my make here</a>
            </label>
            <label>
              <p>Model </p>
    
              {makes && !makes.includes(makeSelected) || modelSelected === "Other" || !models?.includes(modelSelected)?
              <input required  type='text' placeholder='Type in the Model' onChange={(e)=>{setModelSelected(e.target.value)}}/>             
              : <DropDown initial="Other" selectedOption={modelSelected} setSelectedOption={setModelSelected} data={models}/>
           
              }
            </label>
            {/* </label>
            
              {modelSelected === "Other" ||  !models?.includes(modelSelected)?<label><input required  type='text' placeholder='Type in the Model' onChange={(e)=>{setModelSelected(e.target.value)}}/>  </label>:null}
            
           
            <label> */}
            <label>
              <p>Year</p>
              <input type="number" required pattern='\d{4}' onChange={(e)=>{setVehicleYear(e.target.value)}} max={2024}/>
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

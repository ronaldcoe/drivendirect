import React, { useState, useRef, useEffect } from "react";
import "../../styles/blocks/card.css";
import menu from "../../images/menu_dots.svg";
import { ReactSVG } from "react-svg";
import { updateInventoryRecord } from "../../Firebase/FirebaseStateManagement";
import { Store } from "react-notifications-component";
import DropDown from '../../shared/dropdown/DropDown';
import { getVehicles } from '../../Firebase/FirebaseStateManagement';


export default function Card({
  car,
  onClick,
  isSelected,
  type,
  onUpdate,
  update,
}) {

  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  // States for the Edit mode
  const [editMode, setEditMode] = useState(false);
  const [updatedCarData, setUpdatedCarData] = useState({ ...car });
  const [makeSelected, setMakeSelected] = useState(car.make)
  const [modelSelected, setModelSelected] = useState(car.model)

  // Data for Dropdown
  const [dataVehicles, setDataVehicles] = useState(null)
  const [makes, setMakes] = useState(undefined)
  const [models, setModels] = useState(undefined)


  const [otherMake, setOtherMake] = useState(false)
  const [otherModel, setOtherModel] = useState(false)

  // Function to make sure we're not sending incorrect data
  const checkData = () => {
    let errors = []
    
    let makeSelectedError = makeSelected === "" || makeSelected === "Other"
    makeSelectedError && errors.push("You need to provide a Make.")

    let modelSelectedError  = modelSelected === ""
    modelSelectedError && errors.push("You need to provide a Model.")

    let vehicleYearError  = updatedCarData.year === "" || isNaN(parseInt(updatedCarData.year)) || parseInt(updatedCarData.year) > (new Date()).getFullYear() || parseInt(updatedCarData.year) < 1920
    vehicleYearError && errors.push("You need to provide a valid year.")
    console.log(parseInt(updatedCarData.year) > (new Date()).getFullYear())
    let vehicleDescriptionError  = updatedCarData.description === "" 
    vehicleDescriptionError && errors.push("You need to provide a description.")

    return errors
  }


  // Get Static Data
  const fetchdata=async()=>{
    const vehicles = await getVehicles()
    setDataVehicles(vehicles)
        
  }

  // Get the data the first time the component is rendered
  useEffect(()=> {

    fetchdata()
  },[])


  useEffect(()=> {
    if (dataVehicles) {
      setMakes(Object.keys(dataVehicles[0]).sort())

      // When we enter the edit mode. There is a make that is selected
      // that comes from the car data
      setModels(dataVehicles[0][makeSelected])
    }
   
  },[dataVehicles])

 

  // If the state of edit mode changes, reset the state of
  // modelSelected
  useEffect(()=> {
    setModelSelected(car.model)
  },[editMode])

  // If the makeSelected changes, update the updatedCarData state
  // with the new make
  useEffect(()=> {
    
    if (dataVehicles) {
     
      setModels(dataVehicles[0][makeSelected])
      setModelSelected("")
    }
    setUpdatedCarData({
      ...updatedCarData,
      make: makeSelected,
    })
    
  },[makeSelected])

  // If the modelSelected changes, update the updatedCarData state
  // with the new model
  useEffect(()=> {
   
    if (dataVehicles) {
      setModels(dataVehicles[0][makeSelected])
    }
    setUpdatedCarData({
      ...updatedCarData,
      model: modelSelected,
    })
  },[modelSelected])

  


  useEffect(() => {
    const handleMouseDown = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // This handles the car data update
  const changeCarData =async (e) => {
    e.preventDefault()

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

    if(errors.length === 0) {
      const res = await updateInventoryRecord(car.id, updatedCarData, type);
      setEditMode(!editMode)
      onUpdate(!update);


      if(res) {
        Store.addNotification({
          title: "Success",
          message: "Your vehicle was sucessfully updated.",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeInDown"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            showIcon: true,
          },
        });
      }

    } else {
      Store.addNotification({
        title: "Error",
        message: "There was an issue when updating the vehicle.",
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



  // This Handle the Update on the Status as Sold or Found
  const changeStatus = async (type, car) => {
    var updatedCar = {};
    if (type == "listing") {
      updatedCar = {
        ...car,
        status: "Found",
      };
    }
    if (type == "trade") {
      updatedCar = {
        ...car,
        status: "Sold",
      };
    }

    await updateInventoryRecord(car.id, updatedCar, type);
    onUpdate(!update);

    Store.addNotification({
      title: "Success",
      message: "Your vehicle was sucessfully updated.",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeInDown"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        showIcon: true,
      },
    });
  };

  // This will handle the soft delete of an Inventory
  // Inventory is not delete but the status is changed
  const softDeleteInventory = async (car) => {
    var updatedCar = {
      ...car,
      status: "Delete",
    };

    // Make the update

    await updateInventoryRecord(car.id, updatedCar, type);
    onUpdate(!update);

    Store.addNotification({
      title: "Success",
      message: "Your vehicle was sucessfully deleted.",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeInDown"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        showIcon: true,
      },
    });
  };


  // Cancel and exit the edit mode
  const handleCancel = () => {
    setEditMode(!editMode);
    setMakeSelected(car.make)
   
  }
  

  return (
    <div className="vehiclecard" onClick={onClick}>
      <div className="vehiclecard__title">
        {!editMode &&
          <h3>
            {car.year} {car.make} {car.model}
          </h3>
        }

        <div className="vehiclecard__title__options">
          {!editMode && <ReactSVG src={menu} className="menu" onClick={() => {
          setShowOptions(!showOptions);
        }}/>}
          {showOptions && (
            <div ref={optionsRef} className="options">
              <ul>
                <li>
                  <a onClick={()=> {setEditMode(!editMode);setShowOptions(!showOptions)}}>Edit</a>
                </li>
                {type == "listing" ? (
                  <li>
                    <a onClick={() => changeStatus("listing", car)}>
                      Mark as Found
                    </a>
                  </li>
                ) : (
                  <li>
                    <a onClick={() => changeStatus("trade", car)}>
                      Mark as Sold
                    </a>
                  </li>
                )}

                <li>
                  <a onClick={() => softDeleteInventory(car)}>Delete</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {editMode? 
        (
        
        <div className="vehiclecard__edit_car">
          <form onSubmit={changeCarData}>
            <label>
              <p>Make</p>
              {/* <DropDown initial="Other" selectedOption={makeSelected} setSelectedOption={setMakeSelected} data={makes}/>


              {makes && !makes.includes(makeSelected) &&makeSelected !== ''?
              <input required style={{marginTop:'20px'}} type='text' placeholder='Type in the Make' onChange={(e)=>{setMakeSelected(e.target.value)}}/>             
              :null
              } */}

              {!otherMake && <DropDown selectedOption={makeSelected} setSelectedOption={setMakeSelected} data={makes}/>}

                                          
              {otherMake?<input required  type='text' placeholder='Type in the Make' onChange={(e)=>{setMakeSelected(e.target.value)}}/>             
              :null
              }
              <a className='addVehicle__other' onClick={()=>{setOtherMake(!otherMake);setMakeSelected("")}}>{otherMake?"Go back":"Other Make"}</a>

            </label>

            <label>
              <p>Model</p>
              {/* {makes && !makes.includes(makeSelected)?
              <input required  type='text' placeholder='Type in the Model' value={modelSelected} onChange={(e)=>{setModelSelected(e.target.value)}}/>             
              : <DropDown initial="Other" selectedOption={modelSelected} setSelectedOption={setModelSelected} data={models}/>
           
              } */}

              {!otherMake && !otherModel? <DropDown  selectedOption={modelSelected} setSelectedOption={setModelSelected} data={models}/>:""}

              {otherMake || otherModel?  <input required  type='text' placeholder='Type in the Model' onChange={(e)=>{setModelSelected(e.target.value)}}/> :""  }

              <a className='addVehicle__other' onClick={()=>{setOtherModel(!otherModel); setModelSelected("")}}>{otherModel?"Go back":"Other Model"}</a>

              
            </label>

            

          <label>
            <p>Year</p>
            <input type="number" required  min={1900} max={2024} value={updatedCarData.year} onChange={(e) =>
                  setUpdatedCarData({
                    ...updatedCarData,
                    year: e.target.value,
                  })
                } />
          </label>
            <label>
              <p>Description</p>
              <textarea defaultValue={updatedCarData.description} name="" id="" cols="10" rows="10"  onChange={(e) =>
                  setUpdatedCarData({
                    ...updatedCarData,
                    description: e.target.value,
                  })
                }>
              </textarea>
            </label>
          <div style={{display:"flex",gap:"10px"}}>
            <button id="vehiclecard__update" type="submit">Update</button>
            <a  className="vehiclecard__cancel" onClick={()=> handleCancel()}>Cancel</a>
          </div>
          </form>
        </div>
        
        )  : 
        <>
          <div className="vehiclecard__description">{car.description}</div>
          
        </>
      }
      
    </div>
  );
}

// CardGrid.js
import React, { useEffect, useState } from 'react';
import '../../styles/blocks/cardGrid.css';
import DropDown from '../dropdown/DropDown';
import { getAllInventoryBytype, getUserInfo, getVehicles } from '../../Firebase/FirebaseStateManagement';
import { auth } from '../../Firebase/FirebaseConfig';
import { Store } from 'react-notifications-component';

export default function CardGrid(props) {

  const [makeFilter, setMakeFilter] = useState('All');
  const [modelFilter, setModelFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All')
  const [dataVehicles, setDataVehicles] = useState();
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [regions, setRegions] = useState([])
  const [dealerInformation, setDealerInformation] = useState()
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchInventory = async () => {
    const vehicles = await getAllInventoryBytype(props.type);

    setVehicles(vehicles);
    const uniqueMakes = [...new Set(vehicles.map((obj) => obj.make))];
    setMakes(uniqueMakes);
    setDataVehicles(vehicles);
  };

  // This only gets called when the contact button is clicked and the user is logged in
  const fetchDealerInformation = async (vehicle) => {
    const user = auth.currentUser;
    if (user) {
      if (selectedVehicle === vehicle && dealerInformation) {
        // If the same vehicle is clicked again and contact information is already shown, hide it
        setDealerInformation(null);
        setSelectedVehicle(null);
      } else {
        const dealerInfo = await getUserInfo(vehicle.userId);
        setDealerInformation(dealerInfo);
        setSelectedVehicle(vehicle);
      }
    } else {
      // Have an Alert or something to show the user has not signed in and therefore cannot see
      Store.addNotification({
        title: "Notification",
        message: "You need to log in to see the contact information",
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
    }
  };
  

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    if (makeFilter !== 'All') {
      const filteredModels = vehicles
        .filter((item) => item.make === makeFilter)
        .map((item) => item.model);
      const uniqueModels = [...new Set(filteredModels)];
      setModels(uniqueModels);
    } else {
      setModels([]);
    }
    setModelFilter('All');

    

  }, [makeFilter, vehicles]);


  useEffect(()=> {
    const uniqueRegions = [...new Set(dataVehicles?.map(item => item.region))];
    setRegions(uniqueRegions);
  },[vehicles])


  return (
    <div className='cardGrid'>
      <div className='cardGrid__wrapper'>
        
        <div>
          <div className='cardGrid__description'>
            <h1>Search Inventory</h1>
            <h2>Filters</h2>
            <div className='cardGrid__filters'>
              
              <label>
                <p>Make</p>
                <DropDown initial="All" selectedOption={makeFilter} setSelectedOption={setMakeFilter} data={makes.sort()} />
              </label>
     
              <label>
                <p>Model</p>
                <DropDown initial="All" selectedOption={modelFilter} setSelectedOption={setModelFilter} data={models.sort()} />
              </label>

              <label>
                <p>Region</p>
                <DropDown initial="All" selectedOption={regionFilter} setSelectedOption={setRegionFilter} data={regions.sort()} />
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
              <td>Contact Information</td>
            </tr>
          </thead>
          <tbody>
            {dataVehicles
              ?.filter(
                (item) => makeFilter === 'All' || item.make.includes(makeFilter)
              )
              .filter(
                (item) => modelFilter === 'All' || item.model.includes(modelFilter)
              )
              .filter(
                (item) => regionFilter === 'All' || item.region.includes(regionFilter)
              )
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td id='table_year'>{item.year}</td>
                    <td id='table_make'>{item.make}</td>
                    <td id='table_model'>{item.model}</td>
                    <td id='table_location'>{item.region}</td>
                    <td id='table_description'>{item.description}</td>
                    <td id='table_actions'>
                      <button onClick={() => {fetchDealerInformation(item); setSelectedVehicle(item)}}>Contact</button>
                      {selectedVehicle === item && dealerInformation && (
                        <div className='dealer_info'>
                          <strong>Name:</strong>
                          <div>{dealerInformation.firstName} {dealerInformation.lastName}</div>
                          <strong>Business Name:</strong>
                          <div>{dealerInformation.dealership}</div>
                          <strong>Phone Number:</strong>
                          <div>{dealerInformation.phoneNumber}</div>
                          <strong>Email:</strong>
                          <div>{dealerInformation.email}</div>
                          <strong>Website:</strong>
                          <div><a href={`https://${dealerInformation.website}`}>{dealerInformation.website}</a></div>
                          <strong>Location:</strong>
                          <div>{dealerInformation.city} {dealerInformation.region}</div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react"
import React  from 'react'
import "../../styles/blocks/edit_account.css"
import { editUserInfo, getUserInfo, getSubscription, stripeCheckOut, getAllStripeProducts } from '../../Firebase/FirebaseStateManagement';
import { Store } from 'react-notifications-component';
import {useNavigate} from "react-router"
import { confirmPasswordReset } from "firebase/auth";

export default function EditAccount() {

  const navigate = useNavigate()
  const [account, setAccount] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [subsciption, setSubscription] = useState([])

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId');
    const userInfo = await getUserInfo(userId);
    if (userInfo) {
      setAccount(userInfo);
      setUpdatedUser(userInfo); // Initialize updatedUser with account data
    }
  };


  /****************************************************************************************** */
    // This is for the stripe products : Only testing will move in the future
    const [products, setProducts]= useState([])

    const getallSubscribed = async()=>{
        const userId = localStorage.getItem("userId")
        const sub = await getSubscription(userId)
        setSubscription(sub)
    }
    const checkout = async(priceId)=>{
        const userId = localStorage.getItem("userId")
        await stripeCheckOut(userId, priceId)
    }

    useEffect(()=>{
      getallSubscribed()
        const fetchStripeProducts = async()=>{
            const products = await getAllStripeProducts()
            console.log(products)
            setProducts(products)
        }
        fetchStripeProducts()
    }, [])

    /****************************************************************************************** */

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId');
    const result = await editUserInfo(userId, updatedUser);
    if (result) {
      
      Store.addNotification({
        title: "Success",
        message: "Your account was succesfully updated",
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

      navigate('/dashboard')

      
    
    } else {
        Store.addNotification({
          title: "Error",
          message: "Your account wasn't updated",
          type: "danger",
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
console.log(updatedUser)
  return (
    <div className='edit_account'>
      <div className='edit_account__wrapper'>
        <div className='edit_account__wrapper__description'>
          <h1>Edit account</h1>
          <p>If you need to edit other information from your account,
              send us an email at support@carznot.com
          </p>
        </div>
        <div className="edit_account__wrapper__form">
          <form onSubmit={updateUser}>
            <label>
              <p>First Name</p>
              <input
                type='text'
                required
                value={updatedUser.firstName || ""}
                onChange={(e) => {
                  setUpdatedUser((prevUser) => ({
                    ...prevUser,
                    firstName: e.target.value,
                  }));
                }}
              />
            </label>
            <label>
              <p>Last Name</p>
              <input
                type='text'
                required
                value={updatedUser.lastName || ""}
                onChange={(e) => {
                  setUpdatedUser((prevUser) => ({
                    ...prevUser,
                    lastName: e.target.value,
                  }));
                }}
              />
            </label>
            <label>
              <p>Email</p>
              <input
                type='email'
                required
                value={updatedUser.email || ""}
                onChange={(e) => {
                  setUpdatedUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }));
                }}
              />
            </label>
            <label>
              <p>Business Name</p>
              <input
                type='text'
                required
                value={updatedUser.businessName || ""}
                onChange={(e) => {
                  setUpdatedUser((prevUser) => ({
                    ...prevUser,
                    businessName: e.target.value,
                  }));
                }}
                minLength='2'
              />
            </label>
            <label>
              <p>Website</p>
              <input
                type='text'
                required
                value={updatedUser.website || ""}
                onChange={(e) => {
                  setUpdatedUser((prevUser) => ({
                    ...prevUser,
                    website: e.target.value,
                  }));
                }}
              />
            </label>
            <label>
              <p>Phone Number</p>
              <input
                type='tel'
                value={updatedUser.phoneNumber || ""}
                onChange={(e) => {
                  setUpdatedUser((prevUser) => ({
                    ...prevUser,
                    phoneNumber: e.target.value,
                  }));
                }}
                required
              />
            </label>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
      <div className="stripe_management">
        {/* *************************************STRIPE STUFF****************************************************** */}
        <div>
          <h2>Subscriptions</h2>
          {subsciption?.map((product)=>{
            // const isCurrentPlan = product?.name.toLowerCase().includes(subsciption[0]?.role.toLowerCase()) && subsciption[0].status !="canceled"
            // console.log(isCurrentPlan)
            const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
            const startDate = new Date(product.current_period_start.seconds * 1000);
            const startDateString = startDate.toLocaleDateString(undefined, options)

            const endDate = new Date(product.current_period_end.seconds * 1000);
            const endDateString = endDate.toLocaleDateString(undefined, options)

              console.log(product)
              return <div key={product.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                          <h2>{product.role}</h2>
                          <p>{product.description}</p>
                          <p>Subscription Type: {product.items[0].plan.interval}ly (Recurring)</p>
                          <p>Subscription Start Date: {startDateString}</p>
                          <p>Subscription End Date: {endDateString}</p>
                          <p>Subscription Cost: ${parseFloat(product.items[0].plan.amount)/100} {product.items[0].plan.currency}</p>
                          <p></p>
                          <button>Manage your Subscription</button>
                          {/* <button disabled= {isCurrentPlan} onClick={()=>{checkout(product.prices[0].id)}}>{isCurrentPlan? "Already Subscribed": "Subscribe"}</button> */}
                      </div>
          })}
        </div>
        <div>
          <h2>List of available Plans</h2>
          {products?.map((product)=>{
            // const isCurrentPlan = product?.name.toLowerCase().includes(subsciption[0]?.role.toLowerCase()) && subsciption[0].status !="canceled"
            // console.log(isCurrentPlan)
              return <div key={product.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                          <h2>{product.name}</h2>
                          <img src={product.images[0]} alt={product.name}/>
                          <p>Description: {product.description}</p>
                          <p><strong>Price: {parseFloat(product.prices[0].unit_amount)/100 } {product.prices[0].currency}</strong></p>
                          {/* <button disabled= {isCurrentPlan} onClick={()=>{checkout(product.prices[0].id)}}>{isCurrentPlan? "Already Subscribed": "Subscribe"}</button> */}
                      </div>
          })}
        </div>
        {/* ******************************************************************************************* */}
      </div>
    </div>
  );
}

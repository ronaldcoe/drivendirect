import { useEffect, useState } from "react"
import React  from 'react'
import "../../styles/blocks/edit_account.css"
import { editUserInfo, getUserInfo } from '../../Firebase/FirebaseStateManagement';
import { Store } from 'react-notifications-component';
import {useNavigate} from "react-router"

export default function EditAccount() {

  const navigate = useNavigate()
  const [account, setAccount] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId');
    const userInfo = await getUserInfo(userId);
    if (userInfo) {
      setAccount(userInfo);
      setUpdatedUser(userInfo); // Initialize updatedUser with account data
    }
  };

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

      
    
    }
  };
console.log(updatedUser)
  return (
    <div className='edit_account'>
      <div className='edit_account__wrapper'>
        <h1>Edit account</h1>
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
              value={updatedUser.dealership || ""}
              onChange={(e) => {
                setUpdatedUser((prevUser) => ({
                  ...prevUser,
                  dealership: e.target.value,
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
          <button type="submit">Update Account</button>
        </form>
      </div>
    </div>
  );
}

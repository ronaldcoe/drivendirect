import React, {useState, useEffect} from 'react'
import { getUserInfo, getRentalUsers, approveRental } from '../../Firebase/FirebaseStateManagement';
import '../../styles/blocks/rental_approval.css'
export default function RentalApproval() {


    const [rentalUsers, setRentalUsers] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [confirmApproval, setConfirmApproval] = useState(false)
    const [confirmDeny, setConfirmDeny] = useState(false)
    const fetchUserInfo = async ()=>{
        var userId = localStorage.getItem('userId')
        var userInfo = await getUserInfo(userId)
        if (userInfo.role === "admin") {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }
    
    const fetchRentals = async () => {
        var rentalUsers = await getRentalUsers()
        setRentalUsers(rentalUsers)
    }
    useEffect(()=> {
        fetchUserInfo()
        fetchRentals()
    },[])
    console.log(confirmApproval)

  return (
    <div className='rental_approval'>
       <div className='rental_approval__wrapper'>
        <div className='rental_approval__wrapper__pending'>
        <h1>Pending Rental Approvals</h1>
            <table role='presentation'>
                <thead>
                    <tr>
                        <td>Business Name</td>
                        <td>City</td>
                        <td>Region</td>
                        <td>Country</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Phone Number</td>
                        <td>Email</td>
                        <td>Website</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                {rentalUsers?.filter(item => item.accountStatus === "pending").map((item, key) => {
                        return (
                            <tbody>
                                
                                <tr className='rental_approval__wrapper__pending__item'>
                                
                                    <td>{item.businessName}</td>
                                    <td>{item.city}</td>
                                    <td>{item.region}</td>
                                    <td>{item.country}</td>                                
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.email}</td>
                                    <td><a href={"https://"+item.website} target='_blank'>{item.website}</a></td>
                                    <td>{item.accountStatus}</td>
                                    <td className='action_buttons'>
                                        <div className='approve_container'>
                                            <button className='approve' onClick={()=>setConfirmApproval(true)}>Approve</button>
                                            {confirmApproval&&
                                                <div className='confirm_option'>
                                                
                                                
                                                    <>
                                                        
                                                        <button className='approve' onClick={() => {approveRental(item.userId, "approved")}}>Confirm</button>
                                                        <button className='deny' onClick={()=>setConfirmApproval(false)}>Cancel</button>
                                                    </>
                                        
                                        
                                                </div>
                                            }
                                            
                                        </div>


                                        <div className='deny_container'>
                                            <button className='deny' onClick={()=>setConfirmDeny(true)}>Deny</button>
                                            {confirmDeny&&
                                                <div className='confirm_option'>
                                                
                                                
                                                    <>
                                                      
                                                        <button className='approve' onClick={() => {approveRental(item.userId, "denied")}}>Confirm</button>
                                                        <button className='deny' onClick={()=>setConfirmDeny(false)}>Cancel</button>
                                                    </>
                                            
                                            
                                                </div>
                                            }
                                            
                                        </div>
                                        
                                    </td>
                                  

                                    
                                </tr>
                            </tbody>
                            
                            )   
                    })}
                </table>
        </div>
       </div>
    </div>
  )
}

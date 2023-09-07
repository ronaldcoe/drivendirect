import React, { useEffect, useState } from 'react'
import { getUserInfo, getRentalUsers } from '../../Firebase/FirebaseStateManagement';
import { useNavigate } from 'react-router';
import '../../styles/blocks/admin_dashboard.css'

export default function AdminDashboard() {
    const [isAdmin, setIsAdmin] = useState(false)



    const navigate = useNavigate();

    const fetchUserInfo = async ()=>{
        var userId = localStorage.getItem('userId')
        var userInfo = await getUserInfo(userId)
        if (userInfo.role === "admin") {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }
    useEffect (() => {
        fetchUserInfo()
    },[])
  return (
    <div className='admin_dashboard'>
        <div className='admin_dashboard_wrapper'>
            <h1>Admin Dashboard</h1>
            {isAdmin?
            <div>
            <button onClick={()=> navigate("/admin/rental-approval")}>Rentals Approval</button>
            </div>:
            <div><p>You don't have permission to see this page</p></div>}
        </div>
    </div>
  )
}

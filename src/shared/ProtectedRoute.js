import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { auth } from '../Firebase/FirebaseConfig';
// import { useLocation } from 'react-router';
import { getSubscription, getUserInfo } from '../Firebase/FirebaseStateManagement';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [account, setAccount] = useState(null)
  const location = useLocation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && localStorage.getItem('isSignedIn')) {
        setUser(user);
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(()=> {
    fetchUserInfo()
   },[])

  // useEffect(() => {
  //   const checkSubscription = async () => {
  //     if (user) {
  //       const hasSubscription = await getSubscription(user.uid);
  //       if (hasSubscription.length >= 1){setHasSubscription(true);}
        
  //     }
  //   };

  //   checkSubscription();
  // }, [user]);

   // Check if the current route is /trade
   const isTradeRoute = location.pathname === '/trade';
   const isSearchRoute = location.pathname === '/search';
   if ((isTradeRoute && !hasSubscription)||(isSearchRoute && !hasSubscription) ) {
     // Redirect the user or handle access for /trade without subscription
     return <div>Access Denied: You need a subscription to access this route.</div>;
   }

   // Admin Protected routes
   const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId')
    const userInfo = await getUserInfo(userId)

    if (userInfo) {
      setAccount(userInfo)
    }

   }
 

   const isAdminDashboardRoute = location.pathname === '/admin'
   const isAdminDashboardRentalApprovalRoute = location.pathname === '/admin/rental-approval'
   if (isAdminDashboardRoute && account?.role !== "admin") {
    return(<p>Access Denied: You don't have permissions to acces this page.</p>)
   }
   if (isAdminDashboardRentalApprovalRoute && account?.role !== "admin") {
    return(<p>Access Denied: You don't have permissions to acces this page.</p>)
   }


  if (user) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoute;

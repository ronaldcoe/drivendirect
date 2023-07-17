import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { auth } from '../Firebase/FirebaseConfig';
import { getSubscription } from '../Firebase/FirebaseStateManagement';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hasSubscription, setHasSubscription] = useState(false);

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

  useEffect(() => {
    const checkSubscription = async () => {
      if (user) {
        const hasSubscription = await getSubscription(user.uid);
        if (hasSubscription.length >= 1){setHasSubscription(true);}
        
      }
    };

    checkSubscription();
  }, [user]);

  if (user && hasSubscription) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoute;

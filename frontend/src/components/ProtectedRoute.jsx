
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

let toastShown = false;  // <-- Global flag (resets on page reload)

const ProtectedRoute = () => {
  const { user, token, isLoggingOut } = useAuth();

  if (!user || !token) {
    if (!isLoggingOut && !toastShown) {
      toast.info("Login First");
      toastShown = true;
    }

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;




// import React, { useEffect } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-toastify';

// const ProtectedRoute = () => {
//   const { user, token } = useAuth();

//   useEffect(() => {
//     if (!user || !token) {
//       toast.info("Login First");
//     }
//   }, [user, token]); // Only runs when auth state changes

//   if (!user || !token) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
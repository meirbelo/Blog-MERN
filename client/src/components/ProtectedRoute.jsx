import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isLoggedIn  = window.localStorage.getItem('isLogged')
    return isLoggedIn ? <Outlet  /> :  <Navigate to='login'/> ;
};

export default ProtectedRoute;
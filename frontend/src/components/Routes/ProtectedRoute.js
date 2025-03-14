import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({isAdmin}) => {

    const {loading,logInuser,isAuthenticated}=useSelector((state)=>state.user);

  return (
    <div>
        {isAuthenticated ?
            (isAdmin==='admin'? 
                <Outlet/>:<Navigate to='/login' />)
        :<Navigate to="/login"/>}
    </div>
  )
}

export default ProtectedRoute
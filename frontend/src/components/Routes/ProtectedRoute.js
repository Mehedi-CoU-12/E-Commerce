import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const ProtectedRoute = ({ isAdmin }) => {
    const { logInUser, isAuthenticated, loading } = useSelector((state) => state.user);

    //Wait until loading is finished before making a decision
    if (loading) {
        return <Loader />;
    }

    if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

    // If it's an admin route and user isn't an admin, redirect to home
    if (isAdmin && (!logInUser || !logInUser.role || logInUser.role !== 'admin')) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

import axios from 'axios';
import webFont from 'webfontloader';
import './App.css';

import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logInRequest, logInSuccess, logInFailed } from './features/usersSlice.js';

//pages
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';
import LogInSignUp from './components/User/LogInSignUp.js';
import UserOption from './components/layout/Header/UserOption.js';
import Profile  from './components/User/Profile.js';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';


function App() {
    const dispatch = useDispatch();
    const { isAuthenticated,logInUser } = useSelector((state) => state.user);

    useEffect(() => {
        webFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });
        
        //this extra api call is for persisting login data even if we refresh the page
        const fetchUserData = async () => {
            dispatch(logInRequest()); // Start loading user data

            try {
                const response = await axios.get('http://localhost:4000/api/v1/me', {
                    withCredentials: true, // Ensure cookies are sent with the request
                });

                if (response.data.success) {
                    dispatch(logInSuccess(response.data.data)); // Dispatch success action to update state
                }
            } catch (error) {
                dispatch(logInFailed(error?.response?.data?.message || 'Error fetching user data'));
            }
        };

        // Fetch user data only if not authenticated
        if (!isAuthenticated) {
            fetchUserData();
        }

    }, [dispatch, isAuthenticated]);

    return (
        <>
            <Header />
            {isAuthenticated && <UserOption user={logInUser} />}
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/product/:id" Component={ProductDetails} />
                <Route path="/products" Component={Products} />
                <Route path="/products/:keyword" Component={Products} />
                <Route path="/search" Component={Search} />
                <Route path="/login" Component={LogInSignUp} />
                <Route path="/account" Component={Profile}/>
                <Route path="/password/forgot" Component={ForgotPassword} />
                {isAuthenticated && <Route path='/me/update' Component={UpdateProfile} />}
                {isAuthenticated && <Route path='/password/update' Component={UpdatePassword} />}
            </Routes>
            <Footer />
        </>
    );
}

export default App;

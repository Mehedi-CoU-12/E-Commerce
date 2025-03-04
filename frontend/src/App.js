import axios from 'axios';
import webFont from 'webfontloader';
import './App.css';

import { useEffect,useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logInRequest, logInSuccess, logInFailed } from './features/usersSlice.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

//pages
import Home from './components/Home/Home.js';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import UserOption from './components/layout/Header/UserOption.js';

import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';

import LogInSignUp from './components/User/LogInSignUp.js';
import Profile  from './components/User/Profile.js';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from './components/User/ResetPassword.js';

import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js';
import ConfirmOrder from './components/Cart/ConfirmOrder.js';
import Payment from './components/Cart/Payment.js';
import OrderSuccess from './components/Cart/OrderSuccess.js';


function App() {

    const dispatch = useDispatch();
    const { isAuthenticated,logInUser } = useSelector((state) => state.user);
    const [stripeApiKey,setStripeApiKey]=useState('');

    async function getStripeApiKey() {
        const {data}=await axios.get('http://localhost:4000/api/v1/stripeapikey',{
            withCredentials:true
        });

        setStripeApiKey(data.data.stripeApiKey);
    }

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
            getStripeApiKey();
        }

    }, [dispatch, isAuthenticated]);

    return (
        <>
            <Header />
            {isAuthenticated && <UserOption user={logInUser} />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:keyword" element={<Products />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<LogInSignUp />} />
                <Route path="/account" element={<Profile />} />
                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route path="/password/reset/:token" element={<ResetPassword />} />
                <Route path="/cart" element={<Cart />} />
                {isAuthenticated && <Route path="/me/update" element={<UpdateProfile />} />}
                {isAuthenticated && <Route path="/password/update" element={<UpdatePassword />} />}
                {isAuthenticated && <Route path="/shipping" element={<Shipping />} />}
                {isAuthenticated && <Route path="/order/confirm" element={<ConfirmOrder />} />}
                {isAuthenticated && <Route path="/success" element={<OrderSuccess />} />}


                <Route 
                    path="/process/payment" 
                    element={
                        isAuthenticated && stripeApiKey ? (
                            <Elements stripe={loadStripe(stripeApiKey)}>
                                <Payment />
                            </Elements>
                        ) : null
                    }
                />

                

            </Routes>

            <Footer />
        </>
    );
}

export default App;

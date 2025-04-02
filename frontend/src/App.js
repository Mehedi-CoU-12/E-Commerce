import axios from 'axios';
import webFont from 'webfontloader';
import './App.css';

import { useEffect,useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logInRequest, logInSuccess, logInFailed, loadUser } from './features/usersSlice.js';
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

import MyOrder from './components/Order/MyOrder.js';
import OrderDetails from './components/Order/OrderDetails.js';

import ProtectedRoute from './components/Routes/ProtectedRoute.js';
import Dashboard from './components/Admin/Dashboard.js';
import ProductList from './components/Admin/ProductList.js';
import NewProduct from './components/Admin/NewProduct.js';
import UpdateProduct from './components/Admin/UpdateProduct.js';
import OrderList from './components/Admin/OrderList.js';
import ProcessOrder from './components/Admin/ProcessOrder.js';
import UsersList from './components/Admin/UsersList.js';
import UpdateUser from './components/Admin/UpdateUser.js';
import ProductReviews from './components/Admin/ProductReviews.js';
import Contact from './components/layout/Contact/Contact.js';
import About from './components/layout/About/About.js';
import NotFound from './components/layout/Not Found/NotFound.js';


function App() {

    const dispatch = useDispatch();
    const { isAuthenticated,logInUser } = useSelector((state) => state.user);
    const [stripeApiKey,setStripeApiKey]=useState('');

    async function getStripeApiKey() {
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/stripeapikey`,{
                withCredentials:true
            });
    
            setStripeApiKey(data?.data?.stripeApiKey);
        } catch (error) {
            console.log('stripeApiKey error:',error?.message);
        }
    }

    useEffect(() => {
        webFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });

            dispatch(loadUser());
        
        if(isAuthenticated){
            getStripeApiKey();
        }

    }, [dispatch, isAuthenticated]);

    // if prevent use to inspact the website
    // window.addEventListener("contextmenu",(e)=>e.preventDefault());

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
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />

                {/* protected router */}
                <Route element={<ProtectedRoute/>} >
                    <Route path="/me/update" element={<UpdateProfile />} />
                    <Route path="/password/update" element={<UpdatePassword />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/success" element={<OrderSuccess />} />
                    <Route path="/order/confirm" element={<ConfirmOrder />} />
                    <Route path="/orders" element={<MyOrder />} />
                    <Route path="/order/:id" element={<OrderDetails />} />
                </Route>

                {/* Protected route for admin */}
                <Route element={<ProtectedRoute isAdmin={true} />} >
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/products" element={<ProductList />} />
                    <Route path="/admin/products/new" element={<NewProduct />} />
                    <Route path='/admin/product/:id' element={<UpdateProduct/>} />
                    <Route path='/admin/orders' element={<OrderList/>} />
                    <Route path='/admin/order/:id' element={<ProcessOrder/>} />
                    <Route path="/admin/users" element={<UsersList />} />
                    <Route path="/admin/user/:id" element={<UpdateUser />} />
                    <Route path="/admin/reviews" element={<ProductReviews />} />
                </Route>

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

            <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;

import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './ForgotPassword.css';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../layout/Loader/Loader.js';
import MetaData from '../layout/MetaData.js';
import { forgotPasswordFailed, forgotPasswordRequest, forgotPasswordSuccess } from '../../features/passwordSlice.js';

const stylesForAlert={
    position: "top-right", // Position of the toast
    autoClose: 2000, // Auto-close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const ForgotPassword = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {isAuthenticated}=useSelector((state)=>state.user);
    const {loading,isUpdated,error}=useSelector((state)=>state.forgotPassword);
    
    const [email,setEmail]=useState("");


    const ForgotPasswordSubmit=async(e)=>{
        e.preventDefault();

        const myForm={
            "email":email
        };
            
        dispatch(forgotPasswordRequest());

        try {
            const config = {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true, // Allows cookies
            };

            const {data}=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/password/forgot`,myForm,config);

            dispatch(forgotPasswordSuccess(data.user));
            toast.success("Password Forgoted successfully!", stylesForAlert);
            // navigate('/account');

        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Something went wrong!";
            dispatch(forgotPasswordFailed(errorMessage));
            toast.error(errorMessage, stylesForAlert);
        }
    }

  return (
    <div>
        <MetaData title={'Forgot Password'} />
        {loading?<Loader/>:<Fragment>
            <ToastContainer/>
            <div className="ForgotPasswordContainer">
                <div className="ForgotPasswordBox">
                    <h1 className='ForgotPasswordHeading' >Forgot Password</h1>

                    <form onSubmit={ForgotPasswordSubmit} className='ForgotPasswordForm' encType='application/json' >

                        <div className="ForgotPasswordEmail">
                            <MailOutlineIcon/>
                            <input 
                                type="email" 
                                placeholder='Email' 
                                required 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <input type="submit" value="Forgot" className='ForgotPasswordBtn'/>

                    </form>

                </div>
            </div>
        </Fragment>}
    </div>
  )
}

export default ForgotPassword
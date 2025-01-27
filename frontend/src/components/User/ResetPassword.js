import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import './ResetPassword.css';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../layout/Loader/Loader.js';
import MetaData from '../layout/MetaData.js';
import { resetPasswordFailed, resetPasswordRequest, resetPasswordSuccess } from '../../features/passwordSlice.js';

const stylesForAlert={
    position: "top-right", // Position of the toast
    autoClose: 2000, // Auto-close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const ResetPassword = () => {

    const dispatch=useDispatch();
    const params=useParams();
    const navigate=useNavigate();
    const {loading,isUpdated,error}=useSelector((state)=>state.forgotPassword);
    
    const [newPassword,setNewPassword]=useState("");
    const [confirmedPassword,setConfirmedPassword]=useState("");

    useEffect(()=>{

        if(isUpdated){
            toast.success("Password Updated successfully!", stylesForAlert);
            navigate('/login');
        }

    },[dispatch,isUpdated])

    const ResetPasswordSubmit=async(e)=>{
        e.preventDefault();

        const myForm={
            "password":newPassword,
            "confirmPassword":confirmedPassword
        };
            
        dispatch(resetPasswordRequest());

        try {
            const config = {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true, // Allows cookies
            };

            const token=params.token;
            // console.log('token-------->>>>>',token);

            const {data}=await axios.put(`http://localhost:4000/api/v1/password/reset/${token}`,myForm,config);

            dispatch(resetPasswordSuccess(data.user));
            toast.success("Password Updated successfully!", stylesForAlert);
            navigate('/login');

        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Something went wrong!";
            dispatch(resetPasswordFailed(errorMessage));
            toast.error(errorMessage, stylesForAlert);
        }
    }

  return (
    <div>
        <MetaData title={'Change Password'} />
        {loading?<Loader/>:<Fragment>
            <ToastContainer/>
            <div className="ResetPasswordContainer">
                <div className="ResetPasswordBox">
                    <h1 className='ResetPasswordHeading' >Change Password</h1>

                    <form onSubmit={ResetPasswordSubmit} className='ResetPasswordForm' encType='application/json' >

                        <div>
                            <LockOpenIcon/>
                            <input 
                                type="password" 
                                value={newPassword}
                                autoComplete="current-password"
                                required
                                placeholder='New Password'
                                name='newPassword'
                                onChange={(e)=>setNewPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <LockIcon/>
                            <input 
                                type="password" 
                                value={confirmedPassword}
                                autoComplete="current-password"
                                required
                                placeholder='Confirmed Password'
                                name='password'
                                onChange={(e)=>setConfirmedPassword(e.target.value)}
                            />
                        </div>

                        <input type="submit" value="Update" className='ResetPasswordBtn'/>

                    </form>

                </div>
            </div>
        </Fragment>}
    </div>
  )
}

export default ResetPassword
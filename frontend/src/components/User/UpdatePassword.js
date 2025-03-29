import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './UpdatePassword.css';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../layout/Loader/Loader.js';
import MetaData from '../layout/MetaData.js';
import { updatePasswordFailed, updatePasswordRequest, updatePasswordSuccess } from '../../features/profileSlice.js';

const stylesForAlert={
    position: "top-right", // Position of the toast
    autoClose: 2000, // Auto-close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const UpdatePassword = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {isAuthenticated}=useSelector((state)=>state.user);
    const {loading,isUpdated,error}=useSelector((state)=>state.profile);
    
    const [password,setPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmedPassword,setConfirmedPassword]=useState("");


    // const [user,setUser]=useState({
    //     name:name,
    //     email:email
    // });

    useEffect(()=>{

        if(!isAuthenticated)
            navigate('/login');

    },[dispatch,isAuthenticated,isUpdated])

    const UpdatePasswordSubmit=async(e)=>{
        e.preventDefault();

        // const myForm=new FormData();
        // myForm.set("password",password);
        // myForm.set("newPassword",newPassword);
        // myForm.append("confirmedPassword",confirmedPassword);

        const myForm={
            "oldPassword":password,
            "newPassword":newPassword,
            "confirmPassword":confirmedPassword
        };
            
        dispatch(updatePasswordRequest());

        try {
            const config = {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true, // Allows cookies
            };

            const {data}=await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/password/update`,myForm,config);

            dispatch(updatePasswordSuccess(data.user));
            toast.success("Password Updated successfully!", stylesForAlert);
            navigate('/account');

        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Something went wrong!";
            dispatch(updatePasswordFailed(errorMessage));
            toast.error(errorMessage, stylesForAlert);

        }
    }

  return (
    <div>
        <MetaData title={'Change Password'} />
        {loading?<Loader/>:<Fragment>
            <ToastContainer/>
            <div className="UpdatePasswordContainer">
                <div className="UpdatePasswordBox">
                    <h1 className='UpdatePasswordHeading' >Change Password</h1>

                    <form onSubmit={UpdatePasswordSubmit} className='UpdatePasswordForm' encType='application/json' >

                        <div className="UpdatePassword">
                            <KeyIcon/>
                            <input 
                                type="password" 
                                value={password}
                                required
                                placeholder='Old Password'
                                autoComplete="current-password"
                                name='password'
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div className="UpdatePassword">
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

                        <div className="UpdatePassword">
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

                        <input type="submit" value="Update" className='UpdatePasswordBtn'/>

                    </form>

                </div>
            </div>
        </Fragment>}
    </div>
  )
}

export default UpdatePassword
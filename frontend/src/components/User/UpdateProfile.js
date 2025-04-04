import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './UpdateProfile.css';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../layout/Loader/Loader.js';
import MetaData from '../layout/MetaData.js';
import { updateUserFailed, updateUserRequest, updateUserSuccess } from '../../features/profileSlice.js';

const stylesForAlert={
    position: "top-right", // Position of the toast
    autoClose: 2000, // Auto-close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const UpdateProfile = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loading,isUpdated,user}=useSelector((state)=>state?.profile);
    const {isAuthenticated,logInUser}=useSelector((state)=>state?.user);
    
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [avatar,setAvatar]=useState("");
    const [avatarPreview,setAvatarPreview]=useState(logInUser?.avatar?.url ||"/Profile.png");

    useEffect(()=>{

        if(user){
            setName(user?.name || "");
            setEmail(user?.email|| "");
            setAvatarPreview(user?.avatar?.url || "/Profile.png");
        }

        if(!isAuthenticated){
            navigate('/login');
            return;
        }

    },[dispatch,isUpdated,isAuthenticated])

    const UpdateProfileSubmit=async(e)=>{
        e.preventDefault();

        const myForm=new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.append("avatar",avatar);
            
        dispatch(updateUserRequest());

        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            };

            const {data}=await axios.put(`/api/v1/me/update`,myForm,config);

            dispatch(updateUserSuccess(data?.user));
            toast.success("User Updated successfully!", stylesForAlert);
            navigate('/account');

        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage, stylesForAlert);
            dispatch(updateUserFailed(errorMessage));
        }
    }

    const UpdateProfileDataChange = (e) => {
        
        if (e.target.name === "avatar") {
            const file = e.target.files[0];
            if (!file) return; // Ensure file exists
    
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <div>
        <MetaData title={'Update Profile'} />
        {loading?<Loader/>:<Fragment>
            <ToastContainer/>
            <div className="UpdateProfileContainer">
                <div className="UpdateProfileBox">
                    <h1 className='UpdateProfileHeading' >Update Profile</h1>
                    <form onSubmit={UpdateProfileSubmit} className='UpdateProfileForm' encType='multipart/form-data' >

                        <div className="UpdateProfileName">
                            <AccountBoxIcon/>
                            <input 
                                type="text"
                                placeholder='Name'
                                name='name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="UpdateProfileEmail">
                            < MailOutlineIcon />
                            <input 
                                type="email" 
                                value={email}
                                name='email'
                                placeholder='Email'
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div id="UpdateProfileImage">
                            <img src={avatarPreview} alt="profile"/>
                            <input 
                                type="file" 
                                name='avatar'
                                accept='image/*'
                                onChange={UpdateProfileDataChange}
                            />
                        </div>

                        <input type="submit" value="Update" className='UpdateProfileBtn'/>

                    </form>

                </div>
            </div>
        </Fragment>}
    </div>
  )
}

export default UpdateProfile
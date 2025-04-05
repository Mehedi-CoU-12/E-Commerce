import React, { Fragment, useEffect, useRef, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './LogInSignUp.css';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loadUser, logInFailed, logInRequest, logInSuccess } from '../../features/usersSlice';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../layout/Loader/Loader.js';

const LogInSignUp = () => {

    //to change the html tag class;
    const registerTab=useRef(null);
    const logInTab=useRef(null);
    const switcherTab=useRef(null);

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const { isAuthenticated,loading,error }=useSelector((state)=>state.user);

    //for login data
    const [logInEmail, setLogInEmail] = useState("");
    const [logInPassword, setLogInPassword] = useState("")
    
    //for sign up data
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    })
    
    const {name,email,password}=user;
    const [avatar,setAvatar]=useState(null);
    const [avatarPreview,setAvatarPreview]=useState("/Profile.png");

    const switchTabs=(e,tab)=>{
        if(tab==='LogIn'){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            logInTab.current.classList.remove("shiftToLeft")
        }
        if(tab==='register'){
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            logInTab.current.classList.add("shiftToLeft")
        }
    }

    const stylesForAlert={
        position: "top-right", // Position of the toast
        autoClose: 2000, // Auto-close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    // Extract 'redirect' query parameter safely
    const redirect = new URLSearchParams(location.search).get("redirect") || "/account";

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch])
    

    // useEffect(()=>{
    //     if(error){
    //         // console.log('error',error)
    //         toast.error(error?.response?.data?.message,stylesForAlert);
    //     }

    //     if(isAuthenticated){
    //         navigate(`${redirect}`);
    //     }
        
    // },[error,isAuthenticated,redirect])

    const logInSubmit=async(e)=>{
        e.preventDefault();
        
        try {
            dispatch(logInRequest());
            const config = {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
              };

            const {data}=await axios.post(`https://shop-today.onrender.com/api/v1/login`,{email:logInEmail,password:logInPassword},config);
            
            toast.success("Log-in successful!", stylesForAlert);
            dispatch(logInSuccess(data?.data))
            dispatch(loadUser());
            // fetchUserData();

        } catch (error) {
            dispatch(logInFailed(error?.message));
            toast.error(error?.message,stylesForAlert);
        }

        // //clear the form data
        setLogInEmail("");
        setLogInPassword("");
    }

    const registerSubmit=async(e)=>{
        e.preventDefault();

        const myForm=new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar);

        
        // for (let [key, value] of myForm.entries()) {
            //     console.log(`${key}: ${value}`);
            // }
            
        dispatch(logInRequest());

        try {
            const config={Headers:{"Content-Type":"multipart/form-data"},withCredentials:true};
            const {data}=await axios.post(`/api/v1/register`,myForm,config);
            
            // console.log(data);
            dispatch(logInSuccess(data?.user));
            // dispatch(updateUserSuccess(data?.user));
            toast.success("Registration successful!", stylesForAlert);

        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Something went wrong!";
            dispatch(logInFailed(errorMessage));
            toast.error(errorMessage, stylesForAlert);
        }
    }

    const registerDataChange = (e) => {

        if (e.target.name === "avatar") {

            const file = e.target.files[0];
            const reader = new FileReader();
    
            reader.onload = () => {

                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(file);
                }
            };
            reader.readAsDataURL(file); // Ensure this is called

        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    

  return (
   <div>
    {loading?<Loader/>: <Fragment>
        <ToastContainer/>
        <div className="LogInSignUpContainer">
            <div className="LogInSignUpBox">

                <div>
                    <div className="logIn_signUp_toggle">
                        <p onClick={(e)=>switchTabs(e,"LogIn")} >LOGIN</p>
                        <p onClick={(e)=>switchTabs(e,"register")} >REGISTER</p>
                    </div>
                    <button ref={switcherTab} ></button>
                </div>

                <form ref={logInTab}  onSubmit={logInSubmit} className="logInForm">

                    <div className="logInEmail">
                        <MailOutlineIcon/>
                        <input 
                            type="email" 
                            placeholder='Email' 
                            required 
                            value={logInEmail}
                            onChange={(e)=>setLogInEmail(e.target.value)}
                        />
                    </div>

                    <div className="logInPassword">
                        <LockOpenIcon/>
                        <input 
                            type="password" 
                            placeholder='Password'
                            required
                            value={logInPassword}
                            onChange={(e)=>setLogInPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/forgot" >Forgot Password?</Link>
                    <input type="submit" value="LogIn" className='logInBtn' />
                </form>

                <form ref={registerTab} onSubmit={registerSubmit} className='signUpForm' encType='multipart/form-data' >

                    <div className="signUpName">
                        <AccountBoxIcon/>
                        <input 
                            type="text"
                            placeholder='Name'
                            name='name'
                            required
                            value={name}
                            onChange={registerDataChange}
                        />
                    </div>

                    <div className="signUpEmail">
                        < MailOutlineIcon />
                        <input 
                            type="email" 
                            value={email}
                            name='email'
                            required
                            placeholder='Email'
                            onChange={registerDataChange}
                        />
                    </div>

                    <div className="signUpPassword">
                        <LockOpenIcon/>
                        <input 
                            type="password" 
                            value={password}
                            required
                            placeholder='Password'
                            name='password'
                            onChange={registerDataChange}
                        />
                    </div>

                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview"/>
                        <input 
                            type="file" 
                            name='avatar'
                            accept='image/*'
                            onChange={registerDataChange}
                        />
                    </div>

                    <input type="submit" value="Register" className='signUpBtn'/>

                </form>

            </div>


        </div>
    </Fragment>}
   </div>
  )
}

export default LogInSignUp
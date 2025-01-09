import React, { Fragment, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import './LogInSignUp.css';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const LogInSignUp = () => {

    const logInTab=useRef(null);
    const registerTab=useRef(null);
    const switcherTab=useRef(null);

    const [logInEmail, setLogInEmail] = useState();
    const [logInPassword, setLogInPassword] = useState()
    
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    })
    
    const {name,email,password}=user;
    const [avater,setAvater]=useState();
    const [avaterPreview,setAvaterPreview]=useState("/Profile.png");

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

    const logInSubmit=(e)=>{

    }

    const registerSubmit=(e)=>{
        e.preventDefault();

        const myForm=new FormData();
    }

    const registerDataChange=(e)=>{

        if(e.targer.name==='avater'){

        }
        else{
            setUser({...user,[e.target.name]:e.target.value});
        }
    }

  return (
    <Fragment>
        <div class="LogInSignUpContainer">
            <div class="LogInSignUpBox">

                <div>
                    <div class="logIn_signUp_toggle">
                        <p onClick={(e)=>switchTabs(e,"LogIn")} >LOGIN</p>
                        <p onClick={(e)=>switchTabs(e,"register")} >REGISTER</p>
                    </div>
                    <button ref={switcherTab} ></button>
                </div>

                <form ref={logInTab}  onSubmit={logInSubmit} className="logInForm">

                    <div class="logInEmail">
                        <MailOutlineIcon/>
                        <input 
                            type="email" 
                            placeholder='Email' 
                            required 
                            value={logInEmail}
                            onChange={(e)=>setLogInEmail(e.target.value)}
                        />
                    </div>

                    <div class="logInPassword">
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

                    <div class="signUpName">
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

                    <div class="signUpEmail">
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

                    <div class="signUpPassword">
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
                        <img src={avaterPreview} alt="Avater Preview"/>
                        <input 
                            type="file" 
                            name='avater'
                            accept='image/*'
                            onChange={registerDataChange}
                        />
                    </div>

                    <input type="submit" value="Register" className='signUpBtn'/>

                </form>

            </div>


        </div>
    </Fragment>
  )
}

export default LogInSignUp
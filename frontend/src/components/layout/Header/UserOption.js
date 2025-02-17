import React, { Fragment, useState } from 'react'
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logOutUser, logOutUserFailed, logOutUserSuccess } from '../../../features/usersSlice';
import './UserOption.css';



const UserOption = ({user}) => {

    // console.log(user);
    const [open,setOpen]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {items}=useSelector((state)=>state.cart);

    function orders() {
        navigate('/orders')
    }
    function account() {
        navigate('/account')
    }
    function dashboard() {
        navigate('/dashboard')
    }
    function shoppingCart() {
        navigate('/cart')
    }

    const logOutUserFunc=async()=> {
        toast.success("Logout successful!", {
            position: "top-right", // Position of the toast
            autoClose: 1000, // Auto-close after 1 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });

        try {
            const response=await axios.get("http://localhost:4000/api/v1/logout",{
                withCredentials: true,
              });

            // console.log(response?.data?.message);
            dispatch(logOutUserSuccess());

        } catch (error) {
            // console.log(error?.response?.data?.message)
            dispatch(logOutUserFailed(error?.response?.data?.message));
        }
    }
    
    
    const options = [
        { icon: <ListAltIcon />, name: "Orders" ,func:orders},
        { icon: <PersonIcon />, name: "Profile",func:account},
        { icon:<ShoppingCartIcon style={{color:items.length>0?"tomato":"unset"}} />,name:`Cart(${items.length})`,func:shoppingCart },
        { icon: <ExitToAppIcon />, name: "Logout",func:logOutUserFunc},
    ];
    
        if(user?.role==='admin')
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard",func:dashboard })

  return (
    <Fragment>
        <ToastContainer/>
        <Backdrop open={open} style={{zIndex:"10"}} />
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            open={open}
            style={{zIndex:"11"}}
            className='speedDial'
            direction='down'
            icon={
                <img
                    className='speedDialIcon'
                    src={user?.avatar?.url} 
                    alt='Profile'
                 />
                }
        >
            {options.map((item)=>(
                <SpeedDialAction 
                    key={item.name} 
                    icon={item.icon} 
                    tooltipTitle={item.name} 
                    onClick={item.func}
                    tooltipOpen={window.innerWidth<=600 ? true : false}
                />
            ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOption
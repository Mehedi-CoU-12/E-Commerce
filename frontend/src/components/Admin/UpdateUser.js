import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";


import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { resetUserDetails, userDetailFailed, userDetailRequest, userDetailSuccess } from "../../features/userDetailSlice";

const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const UpdateUser = () => {
    const dispatch = useDispatch();
    const params=useParams();
    const navigate=useNavigate();

    const { loading, error, user } = useSelector((state) => state.userDetails);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState("");

    const userId = params.id;

    useEffect(() => {

        // dispatch(getUserDetails(userId));
            const getUserDetail=async()=>{
                try {
                    dispatch(userDetailRequest());
                    dispatch(resetUserDetails());
                    const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${userId}`,{
                        withCredentials:true
                    })
            
                    dispatch(userDetailSuccess(data?.data));
                } catch (error) {
                    dispatch(userDetailFailed(error?.message));
                    toast.error('something went wrong',toastOptions);
                }
            }

            getUserDetail();

    }, [userId]);

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setRole(user?.role);
    }, [user])
    

    const updateUserSubmitHandler =async(e) => {
        e.preventDefault();

        const myForm={
            name,
            email,
            role
        }

        const config={
            headers:{"Content-Type":"application/json"},
            withCredentials:true,
        }

        //update the user;
        try {
            dispatch(userDetailRequest());
            const {data}=await axios.put(`http://localhost:4000/api/v1/admin/user/${userId}`,myForm,config);
            dispatch(userDetailSuccess(data?.data?.user));

            toast.success('user updated!',toastOptions);
            setTimeout(() => {
                navigate('/admin/users');
            }, 1000);

        } catch (error) {
            dispatch(userDetailFailed(error?.message));
            toast.error(error,toastOptions);
        }
  };

  return (
    <Fragment>
        <ToastContainer/>
        <MetaData title="Update User" />
        <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
            {loading ? (
                <Loader />
            ) : (
                <form
                className="createProductForm"
                onSubmit={updateUserSubmitHandler}
                >
                <h1>Update User</h1>

                <div>
                    <PersonIcon />
                    <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <MailOutlineIcon />
                    <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <VerifiedUserIcon />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    </select>
                </div>

                <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                    loading ? true : false || role === "" ? true : false
                    }
                >
                    Update
                </Button>
                </form>
            )}
            </div>
        </div>
    </Fragment>
  );
};

export default UpdateUser;
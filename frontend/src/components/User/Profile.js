import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import { loadUser } from '../../features/usersSlice';

const Profile = () => {

    const {logInUser:user,loading,isAuthenticated}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    

    useEffect(() => {
        if (!isAuthenticated) 
            navigate('/login');

        dispatch(loadUser()); 
    }, [isAuthenticated, navigate, dispatch]);
    

  return (
    <Fragment>
        {loading && !user?<Loader/>: 
        <Fragment>
            <MetaData title={`${user?.name}'s Profile`} />
            <div className='profileContainer' >
                <div>
                    <h1>My Profile</h1>
                    <img src={user?.avatar?.url} alt={user?.name}/>
                    <Link to="/me/update" >Edit Profile</Link>
                </div>

                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user?.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user?.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(user?.createdAt).substring(0,10)}</p>
                    </div>
                    <div>
                        <Link to="/orders" >My Orders</Link>
                        <Link to="/password/update" >Change Password</Link>
                    </div>
                </div>

            </div>
        </Fragment>}
    </Fragment>
  )
}

export default Profile
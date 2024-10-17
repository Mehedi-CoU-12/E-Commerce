import express from 'express';
import { 
    forgetPassword,
    getAllUsers,
    getSingleUser,
    getUserDetails,
    logInUser, 
    logOutUser, 
    registerUser, 
    resetPassword,
    updatePassword,
    updateUser
} from "../controllers/userController.js";
import { isAuthenticatedUser, isRoleAdmin } from '../middleware/authentication.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',logInUser);
userRouter.get('/logout',logOutUser);
userRouter.post('/password/forgot',forgetPassword);
userRouter.put('/password/reset/:token',resetPassword);
userRouter.get('/me',isAuthenticatedUser,getUserDetails);
userRouter.put('/password/update',isAuthenticatedUser,updatePassword);
userRouter.put('/me/update',isAuthenticatedUser,updateUser);
userRouter.get('/admin/users',isAuthenticatedUser,isRoleAdmin('admin'),getAllUsers);
userRouter.get('/admin/user/:id',isAuthenticatedUser,isRoleAdmin('admin'),getSingleUser);

export {userRouter};
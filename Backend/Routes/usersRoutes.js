import express from 'express';
import { 
    deleteUser,
    forgetPassword,
    getAllUsers,
    getSingleUser,
    getUserDetails,
    logInUser, 
    logOutUser, 
    registerUser, 
    resetPassword,
    updatePassword,
    updateUser,
    updateUserRole
} from "../controllers/userController.js";
import { isAuthenticatedUser, isRoleAdmin } from '../middleware/authentication.js';
import { upload } from '../middleware/multer.middleware.js';

const userRouter=express.Router();

userRouter.post('/register',upload.single('avatar'),registerUser);
userRouter.post('/login',logInUser);
userRouter.get('/logout',logOutUser);

userRouter.post('/password/forgot',forgetPassword);
userRouter.put('/password/reset/:token',resetPassword);
userRouter.put('/password/update',isAuthenticatedUser,updatePassword);

userRouter.get('/me',isAuthenticatedUser,getUserDetails);
userRouter.put('/me/update',isAuthenticatedUser,updateUser);

userRouter.get('/admin/users',isAuthenticatedUser,isRoleAdmin('admin'),getAllUsers);
userRouter.get('/admin/user/:id',isAuthenticatedUser,isRoleAdmin('admin'),getSingleUser);
userRouter.put('/admin/user/:id',isAuthenticatedUser,isRoleAdmin('admin'),updateUserRole);
userRouter.delete('/admin/user/:id',isAuthenticatedUser,isRoleAdmin('admin'),deleteUser)

export {userRouter};
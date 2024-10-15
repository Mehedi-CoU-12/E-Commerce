import express from 'express';
import { 
    forgetPassword,
    logInUser, 
    logOutUser, 
    registerUser 
} from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',logInUser);
userRouter.get('/logout',logOutUser);
userRouter.post('/password/forgot',forgetPassword);

export {userRouter};
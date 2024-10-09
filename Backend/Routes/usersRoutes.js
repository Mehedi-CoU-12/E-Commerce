import express from 'express';
import { 
    logInUser, 
    logOutUser, 
    registerUser 
} from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',logInUser);
userRouter.get('/logout',logOutUser);

export {userRouter};
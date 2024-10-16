import path from "path";
import { User } from "../Models/userModels.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendToken } from "../utils/jwtToken.js";
import {sendEmail} from "../utils/sendEmail.js";
import crypto from 'crypto';

//register a user
const registerUser=asyncHandler(async(req,res)=>{

    const {name,email,password}=req.body;

    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:'sample id',
            url:'profilePicUrl'
        }
    });

    const token=user.getJWTToken();

    // res.status(201).json(new ApiResponse(201,token,'User Created Successfully!'))
    sendToken(user,201,res);
})

//log-in user
const logInUser=asyncHandler(async(req,res,next)=>{

    const {email,password}=req.body;

    if(!email || !password)
        throw new ApiError(401,'Please Enter Email & Password!');

    const user=await User.findOne({email}).select("+password");

    if(!user)
        throw new ApiError(401,'Invalid Email & Password');

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched)
        throw new ApiError(401,'Invalid Email & Password');

    const token=user.getJWTToken();

    // res.status(200).json(new ApiResponse(200,token,'User Logged In Successfully!'));
    sendToken(user,200,res);

})

//logout user
const logOutUser=asyncHandler(async(req,res)=>{

    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        path:'/'
    });

    res.status(200).json(new ApiResponse(200,'','user log out successfully'));
})

//forget password
const forgetPassword=asyncHandler(async(req,res,next)=>{

    const user=await User.findOne({email:req.body.email});

    if(!user)
        throw new ApiError(404,"User not found");

    //get resetpassword token
    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    //creating direct link for forget password

    const resetPasswordUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message=`Your password reset token is :- \n\n ${resetPasswordUrl}\n\n if you have not requested this email then, please ignore it`;

    try {

        await sendEmail({
            email:user.email,
            subject:'E-commerce Password Recovery',
            message
        });

        res.status(201).json(new ApiResponse(201,'',`Email send to ${user.email} successfully!`));
        
    } catch (error) {
        
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});

        throw new ApiError(500,error.message);
    }
})

//reset password
const resetPassword=asyncHandler(async(req,res,next)=>{

    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user=await User.findOne({
        resetPasswordToken,resetPasswordExpire:{ $gt:Date.now()}
    });

    if(!user)
        throw new ApiError(400,'reset password token is invalid or has been expired!');

    if(req.body.password!==req.body.confirmPassword)
        throw new ApiError(400,'password does not matched!')

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken(user,200,res);
})

export {
    registerUser,
    logInUser,
    logOutUser,
    forgetPassword,
    resetPassword,
};
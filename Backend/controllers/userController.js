import { User } from "../Models/userModels.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendToken } from "../utils/jwtToken.js";
import {sendEmail} from "../utils/sendEmail.js";
import { v2 as cloudinary } from 'cloudinary'
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import crypto from 'crypto';

//register a user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if a file exists
    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }

    // Upload the file to Cloudinary
    const uploadResult = await uploadOnCloudinary(req.file.path);

    if (!uploadResult) {
        return res.status(500).json({ message: 'Failed to upload avatar on Cloudinary' });
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
        },
    });

    const token = user.getJWTToken();

    // Send response with token
    sendToken(user, 201, res);
});

//log-in user
const logInUser=asyncHandler(async(req,res,next)=>{

    const {email,password}=req.body;

    if(!email || !password)
        throw new ApiError(401,'Please Enter Email & Password!');

    const user=await User.findOne({email}).select("+password");

    if(!user)
        throw new ApiError(401,'Invalid Email or Password');

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched)
        throw new ApiError(401,'Invalid Email or Password');

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

    const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

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

//get user details
const getUserDetails=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    
    res.status(200).json(new ApiResponse(200,user,'user data fatched successfully!'))
})

//update user password
const updatePassword=asyncHandler(async(req,res,next)=>{
    
    const {oldPassword,newPassword,confirmPassword}=req.body;

    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched=await user.comparePassword(oldPassword);

    if(!isPasswordMatched)
        throw new ApiError(400,'old password is incorrect');

    if(newPassword!==confirmPassword)
        throw new ApiError(400,'password does not matched!');

    user.password=newPassword;

    await user.save();

    sendToken(user,200,res);
})

//update user
const updateUser=asyncHandler(async(req,res,next)=>{

    console.log('-------req.body-----------,',req.body);
    console.log('-------req.files-----------,',req.file);

    let newUser={};

    if(req.body.name){
        newUser.name=req.body.name;
    }

    if(req.body.email){
        newUser.email=req.body.email;
    }

    if(req.body.avatar!=="")
    {
        const user=await User.findById(req.user.id);
        const imageId=user.avatar.public_id;
        
        //delete the previous profile picture
        await cloudinary.uploader.destroy(imageId);
        
        // Upload the file to Cloudinary
        const uploadResult = await uploadOnCloudinary(req.file.path);
        
        newUser.avatar={
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
        };
    }

    console.log('newUser---------------',newUser);

    const user=await User.findByIdAndUpdate(req.user.id,newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    //we will update user profile later;

    res.status(200).json(new ApiResponse(200,'','user updated successfully!'));
})

//get all users (admin)
const getAllUsers=asyncHandler(async(req,res)=>{
    const users=await User.find();

    res.status(200).json(new ApiResponse(200,users,'all user are fatched successfully!'));
})

//get single user (admin)
const getSingleUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id);

    // console.log(req.user);

    if(!user)
        throw new ApiError(400,`User does not exist with id:${req.params.id}`);

    res.status(200).json(new ApiResponse(200,user,'user details are fatched successfully!'));
})

//update user role (admin)
const updateUserRole=asyncHandler(async(req,res)=>{

    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json(new ApiResponse(200,'','user role updated successfully!'));
})

//delete user (admin)
const deleteUser=asyncHandler(async(req,res)=>{

    const user=await User.findById(req.params.id);

    if(!user)
        throw new ApiError(400,`User does not exist with Id:${req.params.id}`)

    //delete user image from cloudinary
    await cloudinary.uploader.destroy(user.avatar.public_id);

    await user.deleteOne();

    res.status(200).json(new ApiResponse(200,'','user delete successfully!'))
})


export {
    registerUser,
    logInUser,
    logOutUser,
    forgetPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateUser,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
};
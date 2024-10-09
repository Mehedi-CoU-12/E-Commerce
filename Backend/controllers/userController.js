import { User } from "../Models/userModels.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendToken } from "../utils/jwtToken.js";

//register a user
const registerUser=asyncHandler(async(req,res)=>{

    const {name,email,password}=req.body;

    console.log(req.body);

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

    const isPasswordMatched=user.comparePassword(password);

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
        httpOnly:true
    });

    res.status(201).json(new ApiResponse(201,'','user log out successfully'));
})

export {
    registerUser,
    logInUser,
    logOutUser,
};
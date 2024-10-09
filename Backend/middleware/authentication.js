import { User } from "../Models/userModels.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

const isAuthenticatedUser=asyncHandler(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token)
        return next(new ApiError(401,'Please login to access this resource'));

    const decodedToken=jwt.verify(token,process.env.JWT_SECRET);

    const user=await User.findById(decodedToken.id);

    req.user=user;

    next();
});

const isRoleAdmin=(role)=>{
    return (req,res,next)=>{

        if(role!==req.user.role)
            return next(new ApiError(403,`Role : ${req.user.role} is not allowed to access this resource`));
        else
        next();
    }

}

export {isAuthenticatedUser,isRoleAdmin};
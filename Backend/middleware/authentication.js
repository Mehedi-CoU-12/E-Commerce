import { User } from "../Models/userModels.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

// const isAuthenticatedUser=asyncHandler(async(req,res,next)=>{
//     const {token}=req.cookies;

//     if(!token)
//         return next(new ApiError(401,'Please login to access this resource'));

//     const decodedToken=jwt.verify(token,process.env.JWT_SECRET);

//     const user=await User.findById(decodedToken.id);

//     req.user=user;
//     next();
// });

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
    // Get token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return next(new ApiError(401, 'Please login to access this resource'));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        
        if (!user) {
            return next(new ApiError(401, 'User not found'));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ApiError(401, 'Invalid or expired token'));
    }
});

const isRoleAdmin=(role)=>{
    return (req,res,next)=>{

        if(role!==req.user.role)
            throw new ApiError(403,`Role : ${req.user.role} is not allowed to access this resource`);
        else
        next();
    }

}

export {isAuthenticatedUser,isRoleAdmin};
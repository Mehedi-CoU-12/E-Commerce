//create token and saving in cookie

import { ApiResponse } from "./ApiResponse.js";

const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken() || req.cookies.token || req.headers.authorization?.split(" ")[1];

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : 'localhost',
        path: '/'
    };

    res.status(statusCode).cookie('token',token,options).json(new ApiResponse(statusCode,{user,token},'TOKEN succesfully created'))
}

export {sendToken}
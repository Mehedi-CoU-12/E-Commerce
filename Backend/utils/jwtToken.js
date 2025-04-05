import { ApiResponse } from "./ApiResponse.js";

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
        path: '/',
    };

    res.status(statusCode)
        .cookie('token', token, options)
        .json(new ApiResponse(statusCode, { user, token }, 'Token successfully created'));
};

export { sendToken };

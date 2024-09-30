import { ApiError } from "../utils/ApiError.js"

const errorHandler=(err,req,res,next)=>{

    if(err instanceof ApiError)
    {
        return res.status(err.statusCode).json({
            success:false,
            message:err.message,
            errors:err.errors || []
        })
    }

    //mongodb error 

    if(err.name==='CastError')
    {
        const message=`Resource not found. Invalid:${err.path}`;
        err=new ApiError(400,message);
    }

    res.status(500).json({
        success:false,
        message:err.message || "Internal Server Error"
    })
}

export {errorHandler};
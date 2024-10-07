import { User } from "../Models/userModels.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

    res.status(201).json(ApiResponse(201,user,'User Created Successfully!'))
})

export {registerUser};
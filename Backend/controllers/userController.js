import { User } from "../Models/userModels.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

    const token=User.getJWTToken();

    res.status(201).json(new ApiResponse(201,token,'User Created Successfully!'))
})

export {registerUser};
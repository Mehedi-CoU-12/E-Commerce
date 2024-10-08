import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs";
import jwt from 'jwt'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name Cannot Exceed 30 Character"],
        minLength:[4,"Name Should Have more than 4 character"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Password"],
        minLength:[8,"Password Should be greater than 8 character"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})


userSchema.pre('save',async function(next) {

    if(!this.isModified("password"))
        next();
    
    this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this_id},process.env.JWT_SECRETE,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

export const User=mongoose.model('User',userSchema);
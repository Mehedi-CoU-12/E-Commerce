import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Products Name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"Please Enter Products Descriptions"],
    },
    price:{
        type:String,
        required:[true,"Please Enter Products Name"],
        maxLength:[8,'price should be between 8 character'],
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Products Category"],
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter"],
        maxLength:[4,'Stock size should be between 4 digit'],
        default:1
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                default:0,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

export const Product= mongoose.model('Product',productSchema);



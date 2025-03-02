import Stripe from 'stripe';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

const processPayment=asyncHandler(async(req,res,next)=>{
    const myPayment=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"bdt",
        metadata:{
            company:"Ecommerce",
        }
    });

    res.status(200).json(new ApiResponse(200,{client_secret:myPayment.client_secret},'payemnt successfull!'));
})

const sendStripeApiKey=asyncHandler(async(req,res,next)=>{
    res.status(200).json(new ApiResponse(200,{stripeApiKey:process.env.STRIPE_API_KEY},"key send successfully!"))
})

export {
    processPayment,
    sendStripeApiKey,
};
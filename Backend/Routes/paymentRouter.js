import express from 'express'
import { isAuthenticatedUser } from '../middleware/authentication.js';
import { processPayment, sendStripeApiKey } from '../controllers/paymentControllers.js';

const paymentRouter=express.Router();

paymentRouter.post('/process/payment',isAuthenticatedUser,processPayment);
paymentRouter.get('/stripeapikey',isAuthenticatedUser,sendStripeApiKey);

export {
    paymentRouter
};
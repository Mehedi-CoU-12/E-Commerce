import  express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

import { productRouter } from './Routes/productsRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { userRouter } from './Routes/usersRoutes.js';
import { orderRouter } from './Routes/orderRouter.js';
import { paymentRouter } from './Routes/paymentRouter.js';

const app=express();

//config
dotenv.config({path:'backend/config/config.env'});

//middlewere
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



//Router 
app.use('/api/v1',productRouter);
app.use('/api/v1',userRouter);
app.use('/api/v1',orderRouter);
app.use('/api/v1',paymentRouter);


//this should be last middlewere
app.use(errorHandler);

export default app;
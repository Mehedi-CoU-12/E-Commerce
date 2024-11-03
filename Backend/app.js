import  express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { productRouter } from './Routes/productsRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { userRouter } from './Routes/usersRoutes.js';
import { orderRouter } from './Routes/orderRouter.js';

const app=express();

//middlewere
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//Router 
app.use('/api/v1',productRouter);
app.use('/api/v1',userRouter);
app.use('/api/v1',orderRouter);


//this should be last middlewere
app.use(errorHandler);

export default app;
import  express from 'express';
import cors from 'cors';
import { productRouter } from './Routes/productsRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app=express();

//middlewere
app.use(express.json());
app.use(cors());

//Router 
app.use('/api/v1',productRouter);

//this should be last middlewere
app.use(errorHandler);

export default app;
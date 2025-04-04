import  express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import apiRouter from './api.js';
import path from 'path';

import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config
dotenv.config();
// dotenv.config({path:'backend/config/config.env'});

const app=express();


//middlewere
app.use(express.json());
app.use(cors({
    origin: [
        'https://shop-today.onrender.com',
        process.env.FRONTEND_URL
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//make the all the router one endpoint
app.use('/api/v1',apiRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//this should be last middlewere
app.use(errorHandler);

export default app;
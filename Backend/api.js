// api.js - Main consolidated router
import express from 'express';
import { productRouter } from './Routes/productsRoutes.js';
import { userRouter } from './Routes/usersRoutes.js';
import { orderRouter } from './Routes/orderRouter.js';
import { paymentRouter } from './Routes/paymentRouter.js';


const router = express.Router();

// Mount all routes under /api/v1
router.use('/', productRouter);
router.use('/', userRouter);
router.use('/', orderRouter);
router.use('/', paymentRouter);

export default router;
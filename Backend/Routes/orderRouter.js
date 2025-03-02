import express from 'express'
import { 
    deleteOrder,
    getAllOrders,
    getSingleOrder, 
    myOrders, 
    newOrder, 
    updateOrderStatus
} from '../controllers/orderController.js';
import { isAuthenticatedUser, isRoleAdmin } from '../middleware/authentication.js';

const orderRouter=express.Router();

orderRouter.post('/order/new',isAuthenticatedUser,newOrder);
orderRouter.get('/order/me',isAuthenticatedUser,myOrders);
orderRouter.get('/order/:id',isAuthenticatedUser,getSingleOrder);

orderRouter.get('/admin/orders',isAuthenticatedUser,isRoleAdmin('admin'),getAllOrders);
orderRouter.put('/admin/order/:id',isAuthenticatedUser,isRoleAdmin('admin'),updateOrderStatus);
orderRouter.delete('/admin/order/:id',isAuthenticatedUser,isRoleAdmin('admin'),deleteOrder);


export{orderRouter};
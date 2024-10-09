import express from 'express'
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts,
    getProductDetails,
    updateProduct 
} from '../controllers/productsController.js';
import { isAuthenticatedUser, isRoleAdmin } from '../middleware/authentication.js';

const productRouter=express.Router();


productRouter.get('/products',getAllProducts);
productRouter.post('/products/new',isAuthenticatedUser,isRoleAdmin('admin'),createProduct)
productRouter.put('/product/:id',isAuthenticatedUser,isRoleAdmin('admin'),updateProduct)
productRouter.delete('/product/:id',isAuthenticatedUser,isRoleAdmin('admin'),deleteProduct)
productRouter.get('/product/:id',getProductDetails)

export {productRouter};
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
productRouter.post('/admin/products/new',isAuthenticatedUser,isRoleAdmin('admin'),createProduct)
productRouter.put('/admin/product/:id',isAuthenticatedUser,isRoleAdmin('admin'),updateProduct)
productRouter.delete('/admin/product/:id',isAuthenticatedUser,isRoleAdmin('admin'),deleteProduct)
productRouter.get('/product/:id',getProductDetails)

export {productRouter};
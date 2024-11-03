import express from 'express'
import { 
    createProduct, 
    createProductReviews, 
    deleteProduct, 
    deleteProductReview, 
    getAllProducts,
    getProductDetails,
    getProductReviews,
    updateProduct 
} from '../controllers/productsController.js';
import { isAuthenticatedUser, isRoleAdmin } from '../middleware/authentication.js';

const productRouter=express.Router();


productRouter.get('/products',getAllProducts);
productRouter.get('/product/:id',getProductDetails)
productRouter.put('/review',isAuthenticatedUser,createProductReviews)
productRouter.get('/reviews',getProductReviews)
productRouter.delete('/reviews',isAuthenticatedUser,deleteProductReview)

productRouter.post('/admin/products/new',isAuthenticatedUser,isRoleAdmin('admin'),createProduct)
productRouter.put('/admin/product/:id',isAuthenticatedUser,isRoleAdmin('admin'),updateProduct)
productRouter.delete('/admin/product/:id',isAuthenticatedUser,isRoleAdmin('admin'),deleteProduct)


export {productRouter};
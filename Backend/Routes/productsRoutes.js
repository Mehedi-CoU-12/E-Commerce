import express from 'express'
import { 
    createProduct, 
    createProductReviews, 
    deleteProduct, 
    deleteProductReview, 
    getAdminProducts, 
    getAllProducts,
    getProductDetails,
    getProductReviews,
    updateProduct 
} from '../controllers/productsController.js';
import { isAuthenticatedUser, isRoleAdmin } from '../middleware/authentication.js';
import { upload } from '../middleware/multer.middleware.js';

const productRouter=express.Router();


productRouter.get('/products',getAllProducts);
productRouter.get('/product/:id',getProductDetails)

productRouter.put('/review',isAuthenticatedUser,createProductReviews)
productRouter.get('/reviews',getProductReviews)
productRouter.delete('/reviews',isAuthenticatedUser,deleteProductReview)

productRouter.post('/admin/products/new',isAuthenticatedUser,isRoleAdmin('admin'), upload.array('images', 10),createProduct)
productRouter.put('/admin/product/:id',isAuthenticatedUser,isRoleAdmin('admin'),upload.array('images',10),updateProduct)
productRouter.delete('/admin/product/:id',isAuthenticatedUser,isRoleAdmin('admin'),deleteProduct)
productRouter.get('/admin/products',isAuthenticatedUser,isRoleAdmin('admin'),getAdminProducts)


export {productRouter};
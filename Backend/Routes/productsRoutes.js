import express from 'express'
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts,
    getProductDetails,
    updateProduct 
} from '../controllers/productsController.js';

const productRouter=express.Router();


productRouter.get('/products',getAllProducts);
productRouter.post('/products/new',createProduct)
productRouter.put('/product/:id',updateProduct)
productRouter.delete('/product/:id',deleteProduct)
productRouter.get('/product/:id',getProductDetails)

export {productRouter};
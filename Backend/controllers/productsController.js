import { Product } from "../Models/productModels.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiFeature } from "../utils/ApiFeatures.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from '../utils/asyncHandler.js'

/*
    here aysnHandler is used instead of try-catch block.
    that means we don't have to use try-catch if we are
    using "AsyncHanlder".
*/

//create a new product
const createProduct=asyncHandler(async(req,res)=>{
    
    const newProduct=new Product(req.body);

    const saveProduct=await newProduct.save();

    if(!saveProduct)
        new ApiError(500,"Product Not Found!");

    res.status(201).json(new ApiResponse(201,newProduct,"Product Created Successfully"));
});

//get all products
const getAllProducts=asyncHandler(async(req,res)=>{

    const searchKeyword=req.query;
    const productCount=await Product.countDocuments();

    const resultPerPage=5;

    const apifeature=new ApiFeature(Product.find(),searchKeyword)
    .search()
    .filter()
    .pagination(resultPerPage);

    const products=await apifeature.query;

    if(!products)
        throw new ApiError(500,"Products Not Found!!!");

    res.status(200).send(new ApiResponse(200,{products,productCount},"Product fatch from DB successfully"));
});

//update product
const updateProduct=asyncHandler(async(req,res)=>{

    const productId=req.params.id;
    const updateData=req.body;

    console.log(updateData,productId);

    const updateProduct=await Product.findByIdAndUpdate(productId,updateData,{new:true,runValidators:true})
    
    if(!updateProduct)
        throw new ApiError(500,"Product Not Found!")

    return res.status(200).json(new ApiResponse(200,updateData,"Product Updated Successfully!"))

});

//delete product
const deleteProduct=asyncHandler(async(req,res)=>{
    
    const productId=req.params.id;

    const product= await Product.findByIdAndDelete(productId);

    if(!product)
        throw new ApiError(500,"Product Not Found!");

    res.status(200).json(new ApiResponse(200,"","Product Remove Successfully!"));
});

//get individuals product details
const getProductDetails=asyncHandler(async(req,res)=>{
    const productId=req.params.id;

    const product=await Product.findById(productId);

    if(!product)
        throw new ApiError(404,'Product Not Found!')

    res.status(200).json(new ApiResponse(200,product,"product fatched successfully"))
        
});

export {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDetails
}
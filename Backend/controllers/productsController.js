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
    
    // const newProduct=new Product(req.body);

    // const saveProduct=await newProduct.save();

    // if(!saveProduct)
    //     throw new ApiError(500,"Product Not Found!");

    req.body.user=req.user.id;

    const product=await Product.create(req.body);

    res.status(201).json(new ApiResponse(201,product,"Product Created Successfully"));
});

//get all products
const getAllProducts=asyncHandler(async(req,res)=>{

    const searchKeyword=req.query;
    const productCount=await Product.countDocuments();

    const resultPerPage=6;

    const apifeature=new ApiFeature(Product.find(),searchKeyword)
    .search()
    .filter()
    .pagination(resultPerPage);

    const products=await apifeature.query;

    if(!products)
        throw new ApiError(500,"Products Not Found!!!");

    res.status(200).send(new ApiResponse(200,{products,productCount,resultPerPage},"Product fatch from DB successfully"));
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

//create products reviews
const createProductReviews=asyncHandler(async(req,res)=>{

    /* 
        if user has already review a product then update else add to the review array.
    */

    const {rating,comment,productId}=req.body;

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product=await Product.findById(productId);

    if(!product)
        throw new ApiError(400,'product for the corresponding id does not found!');

    const isReviewed=product.reviews.find((id)=>id.user.toString()===req.user._id.toString());

    //if user already reviewed
    if(isReviewed){
        product.reviews.forEach((id)=>{

            if(id.user.toString()===req.user._id.toString())
            {
                id.rating=rating;
                id.comment=comment;
            }
        });

    }else{
        product.reviews.push(review);
        product.numberOfReviews=product.reviews.length;
    }

    let totalRatings=0;
    product.reviews.forEach((id)=>{
        totalRatings+=Number(id.rating);
    })

    product.ratings=totalRatings/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json(new ApiResponse(200,'','product reviewed successfully!'));
});

//get all reviews of a product
const getProductReviews=asyncHandler(async(req,res)=>{

    const product=await Product.findById(req.query.id);

    if(!product)
        throw new ApiError(404,'Product not found!');

    res.status(200).json(new ApiResponse(200,product.reviews,'all review of the corresponding product!'))

})

//delete Product review
const deleteProductReview=asyncHandler(async(req,res)=>{

    const product=await Product.findById(req.query.productId);

    if(!product)
        throw new ApiError(404,'Product not found!');

    const reviews=product.reviews.filter((item)=>item._id.toString()!==req.query.id.toString());
    
    //we have to update the ratings,number of review as well
    let totalRatings=0;

    reviews.forEach((item)=>{
        totalRatings+=Number(item.rating);
    })

    const avgRatings=totalRatings/reviews.length;
    const numberOfReviews=reviews.length;

    console.log(req.query.productId,req.query.id);

    //update the product details
    await Product.findByIdAndUpdate(req.query.productId,{reviews,ratings:avgRatings,numberOfReviews},{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json(new ApiResponse(200,'','Review deleted successfully!'));
})

export {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReviews,
    getProductReviews,
    deleteProductReview,
}
import { Product } from "../Models/productModels.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiFeature } from "../utils/ApiFeatures.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import { cloudinary } from "../utils/Cloudinary.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";


/*
    here aysnHandler is used instead of try-catch block.
    that means we don't have to use try-catch if we are
    using "AsyncHanlder".

    images upload:->
    here we can access images in req.files instead of 
    req.body.images because of multer

*/

//create a new product
const createProduct = asyncHandler(async(req, res) => {
    
    let imagesLink = [];
    
    if (req.files && req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {

            const result = await uploadOnCloudinary(req.files[i].path);
            if (result) {
                imagesLink.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
        }
    }
    
    req.body.images = imagesLink;
    req.body.user = req.user.id;
    
    const product = await Product.create(req.body);
    
    res.status(201).json(new ApiResponse(201, product, "Product Created Successfully"));
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

//get all products (Admin)
const getAdminProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find();

    if(!products)
        throw new ApiError(500,"Products Not Found!!!");

    res.status(200).send(new ApiResponse(200,products,"Product fatch from DB successfully"));
});

//update product(admin)
const updateProduct = asyncHandler(async (req, res) => {

    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found!");
    }

    let imagesLink = [...product.images]; // Keep existing images by default

    // Only process new images if files are uploaded
    if (req.files && req.files.length > 0) {
        
        // Delete old images from Cloudinary
        for (const image of product.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        // Upload new images
        imagesLink = [];
        for (const file of req.files) {
            const result = await uploadOnCloudinary(file.path);
            if (result) {
                imagesLink.push({
                    public_id: result.public_id,
                    url: result.secure_url
                });
            }
        }
    }

    // Update product data
    const updateData = {
        ...req.body,
        images: imagesLink,
        user: req.user.id
    };

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true, runValidators: true }
    );

    res.status(200).json(
        new ApiResponse(200, updatedProduct, "Product updated successfully!")
    );
});
//delete product(admin)
const deleteProduct=asyncHandler(async(req,res)=>{
    
    const productId=req.params.id;

    const product= await Product.findById(productId);

    if(!product)
        throw new ApiError(500,"Product Not Found!");

    for(const image of product.images){
        await cloudinary.uploader.destroy(image.public_id);
    }

    await Product.findByIdAndDelete(productId);

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
const deleteProductReview = asyncHandler(async (req, res) => {
    const { productId, id } = req.query;

    // Find the product
    const product = await Product.findById(productId);

    if (!product) throw new ApiError(404, "Product not found!");

    // Filter out the review to delete
    const updatedReviews = product.reviews.filter((item) => item._id.toString() !== id.toString());

    // Handle case when no reviews are left
    let avgRatings = 0;
    let numberOfReviews = updatedReviews.length;

    if (numberOfReviews > 0) {
        const totalRatings = updatedReviews.reduce((acc, item) => acc + Number(item.rating), 0);
        avgRatings = totalRatings / numberOfReviews;
    }

    console.log("Avg Ratings:", avgRatings);
    console.log("Number of Reviews:", numberOfReviews);

    // Update the product details in the database
    await Product.findByIdAndUpdate(
        productId,
        {
            reviews: updatedReviews,
            ratings: avgRatings,
            numberOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json(new ApiResponse(200, "", "Review deleted successfully!"));
});


export {
    createProduct,
    getAllProducts,
    getAdminProducts,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReviews,
    getProductReviews,
    deleteProductReview,
}
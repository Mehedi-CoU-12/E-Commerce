import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import "./ProductDetails.css";

import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

import { addToCart } from "../../features/cartSlice";
import {
    productDetailsFail,
    productDetailsRequest,
    productDetailsSuccess,
} from "../../features/productSlice";

import { 
    reviewFailed, 
    reviewRequest, 
    reviewSuccess 
} from "../../features/reviewSlice";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Rating,
} from '@mui/material';


const ProductDetails = () => {

    const params = useParams();
    const id = params.id;

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(0);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // Fetch product from Redux
    const product = useSelector((state) => state.products.productDetails);
    const loading = useSelector((state) => state.products.loading);
    const cartItems = useSelector((state) => state.cart.items);

    // Load product details
    const fetchProductInfo = async () => {
        try {
            dispatch(productDetailsRequest());
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}`,{
                withCredentials:true
            });
            dispatch(productDetailsSuccess(response?.data?.data));
            setStock(response?.data?.data?.Stock);

            // console.log(response?.data?.data);

        } catch (error) {
            dispatch(productDetailsFail(error?.response?.data?.message));
        }
    };

    useEffect(() => {
        
        fetchProductInfo();

    }, [dispatch, id]);

    // Check if product is already in cart and update stock
    useEffect(() => {
        const cartItem = cartItems.find((item) => item.id === id);
        if (cartItem) {
            setStock(product?.Stock - cartItem.quantity);
        }
    }, [cartItems, product?.Stock, id]);

    const options = {
        size:'large',
        value: product?.ratings || 0,
        readOnly:true,
        precision:0.5,
    };

    const toastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQty) => prevQty - 1);
        }
    };

    const increaseQuantity = () => {
        if (stock > quantity) {
            setQuantity((prevQty) => prevQty + 1);
        }
    };

    const addToCartHandler = () => {

        if (stock > 0) {
            const cartProduct = {
                id: product?._id,
                name: product?.name,
                price: product?.price,
                image: product?.images[0]?.url,
                quantity,
                totalPrice: product?.price * quantity,
            };

            dispatch(addToCart(cartProduct));

            setStock((prevStock) => Math.max(0, prevStock - quantity));
            toast.success("Product Added to Cart", toastOptions);
        } else {
            toast.error("Out of Stock", toastOptions);
        }
    };

    const submitReviewToggle =() => {
        open ? setOpen(false) : setOpen(true);
    };
    
    const reviewSubmitHandler = () => {

        const myForm={
            rating,
            comment,
            productId:id,
        };

        console.log(myForm);

        const sendReview=async()=>{
            try {
                dispatch(reviewRequest());
                const config = {
                    headers: {
                    "Content-Type": "application/json",
                    },
                    withCredentials:true
                };

                await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/review`,myForm,config);

                dispatch(reviewSuccess(myForm));
                toast.success("Review Submitted", toastOptions);
                fetchProductInfo();

            } catch (error) {
                dispatch(reviewFailed(error?.response?.data?.message));
                toast.error(error?.response?.data?.message || "Failed to submit review", toastOptions);
            }
        }

        sendReview();

        setOpen(false);
    };

    //for carousel image
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex(prev => 
            prev === product?.images?.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex(prev => 
            prev === 0 ? product?.images?.length - 1 : prev - 1
        );
    };

    return (
        <Fragment>
            <ToastContainer />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product?.name}`} />
                    <div className="ProductDetails">
                        <div className="imageContainer">
                            {product?.images?.length > 1 && (
                                <>
                                    <button className="navArrow left" onClick={prevImage}>&#10094;</button>
                                    <button className="navArrow right" onClick={nextImage}>&#10095;</button>
                                </>
                            )}
                            
                            <img 
                                className="mainImage"
                                src={product?.images?.[currentImageIndex]?.url} 
                                alt={`Product view ${currentImageIndex + 1}`}
                                onError={(e) => e.target.src = '/fallback-image.jpg'}
                            />
                            
                            {product?.images?.length > 1 && (
                                <div className="imageDots">
                                    {product.images.map((_, index) => (
                                        <span 
                                            key={index}
                                            className={`dot ${index === currentImageIndex ? "active" : ""}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        ></span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="productDetailsSection" >
                            <div className="detailsBlock-1">
                                <h2>{product?.name}</h2>
                                <p> Product # {product?._id} </p>
                            </div>

                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <p> ( {product?.reviews?.length} Reviews) </p>
                            </div>

                            <div className="detailsBlock-3">
                                <h1>{`৳ ${product?.price || 0}`}</h1>

                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>

                                    <button onClick={addToCartHandler} disabled={stock < 1}>
                                        {stock < 1 ? "Out of Stock" : "Add to Cart"}
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={stock < 1 ? "redColor" : "greenColor"}>
                                        {stock < 1 ? "Out of Stock" : "In Stock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description :
                                <span>{product?.description || "No Description Available"}</span>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                        </div>
                    </div>

                    <h3 className="reviewHeading">Reviews</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                        <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />

                        <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                            Submit
                        </Button>
                        </DialogActions>
                    </Dialog>

                    {/* product reviews */}
                    {product?.reviews && product?.reviews[0] ? (
                        <div className="reviews">
                            {product?.reviews.map((review) => (
                                <ReviewCard review={review} key={review._id} />
                            ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;

import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  productDetails,
  productDetailsFail,
} from "../../features/productSlice";
import { toast, ToastContainer } from "react-toastify";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import axios from "axios";

import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { addToCart } from "../../features/cartSlice";

const ProductDetails = () => {

    const params = useParams();
    const id = params.id;

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(0);

    // Fetch product from Redux
    const product = useSelector((state) => state.products.productDetails);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const cartItems = useSelector((state) => state.cart.items);

    // Load product details
    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
                dispatch(productDetails(response?.data?.data));
                setStock(response?.data?.data?.Stock);
            } catch (error) {
                dispatch(productDetailsFail(error?.response?.data?.message));
            }
        };
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
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product?.ratings || 0,
        isHalf: true,
        size: window.innerWidth < 600 ? 18 : 22,
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

    return (
        <Fragment>
            <ToastContainer />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product?.name}`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel animation="slide" duration={1000} navButtonsAlwaysInvisible={true}>
                                {product &&
                                    product.images.map((item, i) => (
                                        <img className="CarouselImage" key={i} src={item.url} alt={`${i} Slide`} />
                                    ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product?.name}</h2>
                                <p> Product # {product?._id} </p>
                            </div>

                            <div className="detailsBlock-2">
                                <ReactStars {...options} />
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

                                    {/* Disable button if stock is 0 */}
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

                            <button className="submitReview">Submit Review</button>
                        </div>
                    </div>

                    <h3 className="reviewHeading">Reviews</h3>

                    {product?.reviews && product.reviews[0] ? (
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

import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productDetails, productDetailsFail } from "../../features/productSlice";
import './ProductDetails.css';

import ReactStars from 'react-rating-stars-component'
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const ProductDetails = () => {

    const params = useParams();
    const id = params.id;

    const dispatch=useDispatch();

    //receive data from redux store
    const product=useSelector((state)=>state.products.productDetails);
    const loading=useSelector((state)=>state.products.loading);
    const error=useSelector((state)=>state.products.error);

    useEffect(()=>{
        
        const fatchProductInfo=async()=>{
            try {

                const response=await axios.get(`http://localhost:3000/api/v1/product/${id}`);

                //send data to redux store
                dispatch(productDetails(response.data.data))
                
            } catch (error) {
                dispatch(productDetailsFail(error?.response?.data?.message));
            }
        }

        fatchProductInfo();


    },[dispatch,id])

    const options={
        edit:false,
        color: "rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value:product?.ratings,
        isHalf:true,
        size:window.innerWidth < 600 ? 18:22,
    }

    return (
       <Fragment>
        {
            loading?(<Loader/>)
            :( 
            <Fragment>
                <MetaData title={`${product?.name}`}  />
                <div className="ProductDetails">
                    <div>
                        <Carousel
                            animation="slide"
                            duration={1000}
                            // indicators={true}
                            // navButtonsAlwaysVisible={false}
                            navButtonsAlwaysInvisible={true} 
                        >
                            {product && product.images.map((item, i) => (
                                <img
                                    className="CarouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))} 
                        </Carousel>
                    </div>
    
                    <div>
                        <div class="detailsBlock-1">
                            <h2>{product && product.name }</h2>
                            <p> Product # { product && product._id} </p>
                        </div>
    
                        <div class="detailsBlock-2">
                            <ReactStars {...options} />
                            <p> ( {product?.reviews?.length} Reviews) </p>
                        </div>
    
                        <div class="detailsBlock-3">
    
                            <h1>{`৳ ${product?.price || 0}`}</h1>
    
                            <div class="detailsBlock-3-1">
    
                                <div class="detailsBlock-3-1-1">
                                    <button>-</button>
                                    <input type="number" value={1} />
                                    <button>+</button>
                                </div>
                                
                                <button>Add to Cart</button>
                            </div>
    
                            <p>
                                Status:
                                <b className={product?.stock<1 ? 'redColor':'greenColor'} >
                                    {product?.stock<1? 'Out of Stock': 'In Stock'}
                                </b>
                            </p>
    
                        </div>
    
                        <div class="detailsBlock-4">
                            Description : 
                            <span>{ product?.description || 'No Description Available'}</span>
                        </div>
                        
                        <button class="submitReview">Submit Review</button>
    
                    </div>
    
                </div>
    
                <h3 class="reviewHeading">Reviews</h3>
    
                {
                    product?.reviews && product.reviews[0]?(
                        <div className="reviews">
                            {
                                product?.reviews.map((review)=><ReviewCard review={review} />)
                            }
                        </div>
                    ):(
                        <p className="noReviews">No Reviews Yet</p>
                    )
                }
    
            </Fragment>)
        }
       </Fragment>
    );
};

export default ProductDetails;

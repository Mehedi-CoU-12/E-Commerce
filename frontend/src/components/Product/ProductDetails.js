import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productDetails, productDetailsFail } from "../../features/productSlice";
import './ProductDetails.css';

import ReactStars from 'react-rating-stars-component'

// function CarouselItem({ item }) {
//   return (
//     <Paper
//       elevation={10}
//       style={{ padding: "20px", textAlign: "center", position: "relative" }}
//     >
//       <img
//         src={item.image}
//         alt={item.name}
//         style={{ width: "100%", height: "300px", objectFit: "cover" }}
//       />
//       <Typography
//         variant="h5"
//         style={{
//           position: "absolute",
//           bottom: "20px",
//           left: "20px",
//           color: "white",
//           fontWeight: "bold",
//           textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
//         }}
//       >
//         {item.name}
//       </Typography>
//       <Typography
//         variant="body1"
//         style={{
//           position: "absolute",
//           bottom: "10px",
//           left: "20px",
//           color: "white",
//           textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
//         }}
//       >
//         {item.description}
//       </Typography>
//     </Paper>
//   );
// }

const options={
    edit:false,
    color: "rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:product.ratings,
    isHalf:true,
    size:window.innerWidth < 600 ? 18:22,
}

const ProductDetails = () => {

    const params = useParams();
    const id = params.id;

    const dispatch=useDispatch();

    //receive data from redux store
    const product=useSelector((state)=>state.products.productDetails);
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

    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel
                        animation="slide"
                        duration={1000}
                        indicators={true}
                        navButtonsAlwaysVisible={true}
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
                        <h2>{ product.name }</h2>
                        <p> Product # {product._id} </p>
                    </div>

                    <div class="detailsBlock-2">
                        <ReactStars  />
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default ProductDetails;

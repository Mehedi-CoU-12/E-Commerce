import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import axios from 'axios';
import { allProductFail, allProductRequest } from '../../features/productSlice';
import { toast, ToastContainer } from 'react-toastify';
import './Products.css';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider'
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData.js';

const stylesForAlert={
    position: "top-right", // Position of the toast
    autoClose: 3000, // Auto-close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const categories=[
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
]

const Products = () => {
    
    const dispatch=useDispatch();
    
    const {items ,loading,resultPerPage,productCount}=useSelector((state)=>state.products);
    
    const {keyword=""}=useParams();
    
    const [currentPage,setCurrentPage]=useState(1);
    const [price,setPrice]=useState([0,50000]);
    const [category,setCategory]=useState("");
    const [ratings,setRatings]=useState(0);

    const setCurrentPageNo=(e)=>{
        setCurrentPage(e);
    }

    const priceHandler=(e,newPrice)=>{
        setPrice(newPrice);
    }

    useEffect(()=>{

        const fatchAllProducts=async()=>{

            try {

                let link=`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

                // console.log(keyword,currentPage,price[0],price[1]);

                if(category)
                    link=`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
                
                
                const response=await axios.get(link,{
                    withCredentials:true
                });
                
                const product=response?.data?.data;
                dispatch(allProductRequest(product));

                console.log('res---,',product);

            } catch (error) {
                dispatch(allProductFail(error.response?.data?.message));
                toast.error(error.response?.data?.message,stylesForAlert);
            }
        }

        fatchAllProducts();

    },[dispatch,keyword,currentPage,price,category,ratings])

    return (
        <Fragment>
        <ToastContainer /> 
            {
                loading?(<Loader/>)
                :(<Fragment>
                    <MetaData title={`All Products`}  />
                    <h2 class="productsHeading">Products</h2>
                    <div class="products">
                    {
                        items?.map((item)=><ProductCard key={item._id} product={item} />)
                    }
                    </div>

                    <div class="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0}
                            max={50000} 
                        />

                        <Typography>Category</Typography>
                        <ul class="categoryBox">
                            {
                                categories.map((categoryItem)=>(
                                    <li 
                                        class="category-link"
                                        key={categoryItem}
                                        onClick={()=>setCategory(categoryItem)}
                                    >
                                        {categoryItem}
                                    </li>
                                ))
                            }
                        </ul>

                        <fieldset>
                            <Typography 
                                component="legend"  
                                style={{
                                    fontSize:"12px", 
                                    whiteSpace: "nowrap", // Prevents text wrapping
                                    overflow: "hidden",   // Hides overflow if text is too long
                                    textOverflow: "ellipsis", // Adds ellipsis if text is too long
                                  }}
                            >Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e,newRating)=>{
                                    setRatings(newRating);
                                }}
                                aria-labelledby='continuous-slider'
                                valueLabelDisplay='auto'
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {
                        currentPage*resultPerPage<productCount && (<div class="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
    
                            />
                        </div>)
                    }
                </Fragment>)
            }
        </Fragment>
    )
}

export default Products
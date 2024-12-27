import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import axios from 'axios';
import { allProductFail, allProductRequest } from '../../features/productSlice';
import { toast, ToastContainer } from 'react-toastify';
import './Products.css';
import { useParams } from 'react-router-dom';

const stylesForAlert={
    position: "top-right", // Position of the toast
    autoClose: 3000, // Auto-close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

const Products = () => {

    const dispatch=useDispatch();
    const loading=useSelector((state)=>state.products.loading);
    const products=useSelector((state)=>state.products.items);

    const {keyword=""}=useParams();

    useEffect(()=>{

        const fatchAllProducts=async()=>{

            try {
                const response=await axios.get(`http://localhost:3000/api/v1/products?keyword=${keyword}`);
                
                const product=response.data.data.products;
                dispatch(allProductRequest(product));

            } catch (error) {
                dispatch(allProductFail(error.response?.data?.message));
                toast.error(error.response?.data?.message,stylesForAlert);
            }
        }

        fatchAllProducts();

    },[dispatch,keyword])

    return (
        <Fragment>
        <ToastContainer /> 
            {
                loading?(<Loader/>)
                :(<Fragment>
                    <h2 class="productsHeading">Products</h2>
                    <div class="products">
                    {
                        products?.map((item)=><ProductCard key={item._id} product={item} />)
                    }
                    </div>
                </Fragment>)
            }
        </Fragment>
    )
}

export default Products
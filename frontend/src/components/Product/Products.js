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
    // const loading=useSelector((state)=>state.products.loading);
    // const products=useSelector((state)=>state.products.items);
    // const resultPerPage=useSelector((state)=>state.products.resultPerPage);
    // const productCount=useSelector((state)=>state.products.productCount);

    const {items ,loading,resultPerPage,productCount}=useSelector((state)=>state.products);

    const {keyword=""}=useParams();

    const [currentPage,setCurrentPage]=useState(1);

    const setCurrentPageNo=(e)=>{
        setCurrentPage(e);
    }

    useEffect(()=>{

        const fatchAllProducts=async()=>{

            try {
                const response=await axios.get(`http://localhost:3000/api/v1/products?keyword=${keyword}&page=${currentPage}`);
                
                const product=response.data.data;
                dispatch(allProductRequest(product));

            } catch (error) {
                dispatch(allProductFail(error.response?.data?.message));
                toast.error(error.response?.data?.message,stylesForAlert);
            }
        }

        fatchAllProducts();

    },[dispatch,keyword,currentPage])

    return (
        <Fragment>
        <ToastContainer /> 
            {
                loading?(<Loader/>)
                :(<Fragment>
                    <h2 class="productsHeading">Products</h2>
                    <div class="products">
                    {
                        items?.map((item)=><ProductCard key={item._id} product={item} />)
                    }
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
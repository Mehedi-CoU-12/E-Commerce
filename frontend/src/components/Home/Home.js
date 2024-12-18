import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import Product from './Product';
import MetaData from '../layout/MetaData.js';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { allProductRequest,allProductFail } from '../../features/productSlice.js';
import Loader from '../layout/Loader/Loader.js';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// const product={
//     name:'MI 11 Lite Ne 5G',
//     price:27500,
//     country:'Bangladesh',
//     images:[{url:'https://i.ibb.co/DRST11n/1.webp'}],
//     _id:'mehedi_hasan'
// }

const stylesForAlert={
    position: "top-right", // Position of the toast
    autoClose: 3000, // Auto-close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

function Home() {

    const dispatch=useDispatch();

    //import data from redux store
    const allProducts=useSelector((state)=>state.products.items) || [];
    const loading=useSelector((state)=>state.products.loading);
    const error=useSelector((state)=>state.products.error) ||  "Failed to fetch products";

    // console.log(allProducts,loading,error);

    useEffect(()=>{

        const fatchProduct=async()=>{
            try {
                //fatch data from backend
                const response=await axios.get('http://localhost:3000/api/v1/products');
                const products=response.data.data.products;
                
                //send data to the redux store
                dispatch(allProductRequest(products));
 
            } catch (err) {
                // console.log(error.response.data.message);
                dispatch(allProductFail(err.response?.data?.message));
                toast.error(err.response?.data?.message,stylesForAlert);
            }
        }

        fatchProduct();

    },[dispatch]);

  return (
    <Fragment>
    <ToastContainer /> 
        {
            loading?(<Loader/>): 

            (<Fragment>

                <MetaData title="ECOMMERCE" />
        
                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                     <h1>FIND AMAZING PRODUCT BELOW</h1> 
        
                    <a href="#container">
                        <button>
                            scroll <CgMouse/>
                        </button>
                    </a>
                </div>
        
                <h2 className="homeHeading"> Featured Products </h2>
        
                <div className="container" id="container">
        
                    {
                        allProducts.map((product)=>{
                            return ( <Product key={product._id} product={product} />)
                        })
                    }
        
                </div>
        
            </Fragment>)
        }
    </Fragment>
  )
}

export default Home
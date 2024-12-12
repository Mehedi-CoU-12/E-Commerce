import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import Product from './Product';
import MetaData from '../layout/MetaData.js';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { allProductRequest } from '../../features/productSlice.js';


const product={
    name:'MI 11 Lite Ne 5G',
    price:27500,
    country:'Bangladesh',
    images:[{url:'https://i.ibb.co/DRST11n/1.webp'}],
    _id:'mehedi_hasan'
}

function Home() {

    const dispatch=useDispatch();
    const allProducts=useSelector((state)=>state.products.items);


    useEffect(()=>{

        const fatchProdect=async()=>{
            try {
                const response=await axios.get('http://localhost:3000/api/v1/products');
                const products=response.data.data.products;
                dispatch(allProductRequest(products));

                // console.log(products);
            } catch (error) {
                console.log(error);
            }
        }

        fatchProdect();

    },[]);

  return (
    <Fragment>

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
            {/* <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} /> */}

            {
                allProducts.map((product)=>{
                    return ( <Product product={product} />)
                })
            }

        </div>

    </Fragment>
  )
}

export default Home
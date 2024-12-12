import React, { Fragment } from 'react'
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import Product from './Product';
import MetaData from '../layout/MetaData.js'

const product={
    name:'MI 11 Lite Ne 5G',
    price:27500,
    country:'Bangladesh',
    images:[{url:'https://i.ibb.co/DRST11n/1.webp'}],
    _id:'mehedi_hasan'
}

function Home() {

    

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
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

        </div>

    </Fragment>
  )
}

export default Home
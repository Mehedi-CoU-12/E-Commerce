import { Rating } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {

    const options = {
        size:'large',
        value: product?.ratings || 0,
        readOnly:true,
        precision:0.5,
    };
    

  return (
    <Link className='productCard' to={`/product/${product._id}`} >

        <img src={product?.images?.[0]?.url} alt={product.name}/> 
        <p> {product.name}</p>

        <div>
            <Rating {...options} /> <span className='porductCardSpan' >({product.numberOfReviews} reviews)</span>
        </div>

        <span>{`৳ ${product.price}`}</span>

    </Link>
  )
}

export default ProductCard
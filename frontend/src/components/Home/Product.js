import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

const Product = ({product}) => {

    const options={
        edit:false,
        color: "rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value:product.ratings,
        isHalf:true,
        size:window.innerWidth < 600 ? 18:22,
    }
    

  return (
    <Link className='productCard' to={product._id} >

        <img src={product?.images?.[0]?.url} alt={product.name}/> 
        <p> {product.name}</p>

        <div>
            <ReactStars {...options} /> <span>({product.numberOfReviews} reviews)</span>
        </div>

        <span>{`৳ ${product.price}`}</span>

    </Link>
  )
}

export default Product
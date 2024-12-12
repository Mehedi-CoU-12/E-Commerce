import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

const options={
    edit:false,
    color:"rbg(20,20,20,0.1)",
    activeColor:"tomato",
    value:2.5,
    isHalf:true,
    size:window.innerWidth < 600 ? 18:22,
}

const Product = ({product}) => {

    // console.log('first--------->',product);

  return (
    <Link className='productCard' to={product._id} >

        {/* <img src={product.images[0].url} alt={product.name}/>  */}
        <p> {product.name}</p>

        <div>
            <ReactStars {...options} /> <span>(256 reviews)</span>
        </div>

        <span>৳ {product.price}</span>

    </Link>
  )
}

export default Product
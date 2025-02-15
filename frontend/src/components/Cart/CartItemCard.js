import React from 'react'
import {Link} from 'react-router-dom'
import './CartItemCard.css';

const CartItemCard = ({item}) => {
  return (
    <div className='CartItemCard' >
        <img src={item?.url} alt="Picture"/>
        <div>
            <Link to={`/product/${item?.product}`} >{item?.name}</Link>
            <span> {`Price: ৳${item?.price}`} </span>
            <p>Remove</p>
        </div>
    </div>
  )
}

export default CartItemCard
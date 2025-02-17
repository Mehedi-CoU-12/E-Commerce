import React from 'react'
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import './CartItemCard.css';
import { removeFromCart } from '../../features/cartSlice';

const CartItemCard = ({item}) => {

    const dispatch=useDispatch();

    const handleClick=()=>{
        dispatch(removeFromCart(item?.id));
    }

  return (
    <div className='CartItemCard' >
        <img src={item?.url} alt="Picture"/>
        <div>
            <Link to={`/product/${item?.product}`} >{item?.name}</Link>
            <span> {`Price: ৳${item?.price}`} </span>
            <p onClick={handleClick} >Remove</p>
        </div>
    </div>
  )
}

export default CartItemCard
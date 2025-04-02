import React from 'react'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Typography from '@mui/material/Typography';
import {useSelector } from 'react-redux';
import CartItemCard from './CartItemCard';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {

    const navigate=useNavigate();
    const {items,totalPrice}=useSelector((state)=>state.cart);

    // console.log(items);

    const checkOutHandler=()=>{
        navigate("/login?redirect=/shipping"); 
    }

  return (
   <div>
    {items.length===0 ?(
        <div className="emptyCart">
            <RemoveShoppingCartIcon />
            <Typography>No Product in Your Cart</Typography>
            <Link to="/products">View Products</Link>
      </div>
    ): <div>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {items && items.map((item,index)=>(
                <div key={index} className="cartContainer">
                    <CartItemCard item={item}/>
                    <div className="cartInput">
                        <button>-</button>
                        <input type="number" value={item?.quantity} readOnly />
                        <button>+</button>
                    </div>
                    <div className="cartSubtotal">{`৳ ${item?.price*item?.quantity}`}</div>
            </div>
 
            ))}
             <div className="cartGrossTotal">
                 <div></div>
                 <div className="cartGrossTotalBox">
                     <p>Gross Total</p>
                     <p>{`৳ ${totalPrice}`}</p>
                 </div>
                 <div></div>
                 <div className="checkOutBtn">
                     <button onClick={checkOutHandler} >Check Out</button>
                 </div>
             </div>

        </div>
    </div>}
   </div>
  )
}

export default Cart
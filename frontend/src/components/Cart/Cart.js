import React from 'react'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Typography from '@mui/material/Typography';
import { useDispatch,useSelector } from 'react-redux';
import CartItemCard from './CartItemCard';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {items,totalPrice}=useSelector((state)=>state.cart);

    const checkOutHandler=()=>{
        navigate('/login?redirect=shipping');
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
        <div class="cartPage">
            <div class="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {items && items.map((item)=>(
                <div class="cartContainer">
                    <CartItemCard item={item}/>
                    <div class="cartInput">
                        <button>-</button>
                        <input type="number" value={item?.quantity} readOnly />
                        <button>+</button>
                    </div>
                    <div class="cartSubtotal">"{`৳ ${item?.price*item?.quantity}`}</div>
            </div>
 
            ))}
             <div class="cartGrossTotal">
                 <div></div>
                 <div class="cartGrossTotalBox">
                     <p>Gross Total</p>
                     <p>{`৳ ${totalPrice}`}</p>
                 </div>
                 <div></div>
                 <div class="checkOutBtn">
                     <button onClick={checkOutHandler} >Check Out</button>
                 </div>
             </div>

        </div>
    </div>}
   </div>
  )
}

export default Cart
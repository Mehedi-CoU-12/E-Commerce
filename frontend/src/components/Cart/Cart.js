import React from 'react'
import './Cart.css';
import CartItemCard from './CartItemCard';

const Cart = () => {

    const item={
        product:"productId",
        price:200,
        name:"mehedi",
        quantity:1
    }

  return (
    <div>
        <div class="cartPage">
            <div class="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            <div class="cartContainer">
                <CartItemCard item={item}/>

                <div class="cartInput">
                    <button>-</button>
                    <input type="number" value={item?.quantity} readOnly />
                    <button>+</button>
                </div>

                <div class="cartSubtotal">"{`৳ ${item?.price*item?.quantity}`}</div>
            </div>

            <div class="cartGrossTotal">
                <div></div>
                <div class="cartGrossTotalBox">
                    <p>Gross Total</p>
                    <p>{`৳ 300`}</p>
                </div>
                <div class="checkOutBtn">
                    <button>Check Out</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Cart
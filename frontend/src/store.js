import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import userReducer from './features/usersSlice'
import profileReducer  from './features/profileSlice';
import passwordReducer from './features/passwordSlice';
import shippingReducer from './features/shippingSlice'
import newOrderReducer from './features/newOrderSlice'

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        shipping:shippingReducer,
        user: userReducer,
        profile:profileReducer,
        forgotPassword:passwordReducer,
        newOrder:newOrderReducer
    },
});

export default store;

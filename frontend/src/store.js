import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import userReducer from './features/usersSlice'
import profileReducer  from './features/profileSlice';
import passwordReducer from './features/passwordSlice';
import shippingReducer from './features/shippingSlice'

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        shipping:shippingReducer,
        user: userReducer,
        profile:profileReducer,
        forgotPassword:passwordReducer,
    },
});

export default store;

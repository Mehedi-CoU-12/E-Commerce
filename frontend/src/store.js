import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import userReducer from './features/usersSlice';
import profileReducer  from './features/profileSlice';
import passwordReducer from './features/passwordSlice';
import shippingReducer from './features/shippingSlice';
import newOrderReducer from './features/newOrderSlice';
import individualOrderReducer from './features/individualsOrderDetailsSlice';
import reviewReducer from './features/reviewSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        shipping:shippingReducer,
        user: userReducer,
        profile:profileReducer,
        forgotPassword:passwordReducer,
        newOrder:newOrderReducer,
        individualOrder:individualOrderReducer,
        reviews:reviewReducer,
    },
});

export default store;

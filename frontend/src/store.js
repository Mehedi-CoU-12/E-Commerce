import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import userReducer from './features/usersSlice'
import profileReducer  from './features/profileSlice';
import passwordReducer from './features/passwordSlice';


const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        user: userReducer,
        profile:profileReducer,
        forgotPassword:passwordReducer,
    },
});

export default store;

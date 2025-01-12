import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import userReducer from './features/usersSlice'


const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        user: userReducer,
    },
});

export default store;

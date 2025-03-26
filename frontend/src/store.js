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
import adminProductReducer from './features/adminProductSlice';
import newProductReducer from './features/newProductSlice';
import deleteProductReducer from './features/deleteProductSlice';
import updateProductReducer from './features/updateProductSlice';
import allOrderReducer from './features/allOrderSlice';
import deleteOrderReducer from './features/deleteOrderSlice';
import allUserReducer from './features/allUserSlice';
import userDetailsReducer from './features/userDetailSlice';
import allReviewsReducer from './features/allReviewSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        profile:profileReducer,
        forgotPassword:passwordReducer,
        cart: cartReducer,
        newOrder:newOrderReducer,
        shipping:shippingReducer,
        individualOrder:individualOrderReducer,
        reviews:reviewReducer,
        adminProduct:adminProductReducer,
        newProduct:newProductReducer,
        deleteProduct:deleteProductReducer,
        updateProduct:updateProductReducer,
        allOrders:allOrderReducer,
        deleteOrder:deleteOrderReducer,
        allUsers:allUserReducer,
        userDetails:userDetailsReducer,
        allReviews:allReviewsReducer,
    },
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

const initialState={
    items:[],
    productDetails:null,
    loading:true,
    error:null,
}

export const productSlice=createSlice({
    name:'Products',
    initialState,
    reducers:{
        //all product
        allProductRequest:(state,action)=>{
            state.items=action.payload;
            state.loading=false;
        },
        allProductFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        //individual product deatails
        productDetails:(state,action)=>{
            state.loading=false;
            state.productDetails=action.payload;
        },
        productDetailsFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})

export const {
    
    allProductRequest,
    allProductFail,
    productDetails,
    productDetailsFail,

}=productSlice.actions;

export default productSlice.reducer;
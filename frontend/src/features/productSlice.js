import { createSlice } from '@reduxjs/toolkit';

const initialState={
    items:[],
    productDetails:null,
    productCount:0,
    resultPerPage:0,
    loading:true,
    error:null,
}

export const productSlice=createSlice({
    name:'Products',
    initialState,
    reducers:{
        //all product
        allProductRequest:(state,action)=>{
            state.items=action.payload.products;
            state.productCount=action.payload.productCount;
            state.resultPerPage=action.payload.resultPerPage;
            state.loading=false;

            // console.log(action.payload);
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
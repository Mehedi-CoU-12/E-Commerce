import { createSlice } from '@reduxjs/toolkit';

const initialState={
    products:[]
}

export const productSlice=createSlice({
    name:'Products',
    initialState,
    reducers:{
        allProductRequest:(state,action)=>{
            state.products=action.payload;
        }
    }
})

export const {allProductRequest}=productSlice.actions;

export default productSlice.reducer;
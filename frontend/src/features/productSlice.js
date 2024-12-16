import { createSlice } from '@reduxjs/toolkit';

const initialState={
    items:[],
}

export const productSlice=createSlice({
    name:'Products',
    initialState,
    reducers:{
        allProductRequest:(state,action)=>{
            state.items=action.payload;
        }
    }
})

export const {allProductRequest}=productSlice.actions;

export default productSlice.reducer;
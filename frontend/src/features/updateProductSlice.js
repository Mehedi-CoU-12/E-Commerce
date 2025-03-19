import { createSlice } from "@reduxjs/toolkit";

const initialState={
    product:null,
    loading:false,
    error:null,
    isUpdated:false,
}

const updateProductSlice=createSlice({
    name:'update product',
    initialState,
    reducers:{
        updateProductRequest: (state) => {
            state.loading = true;
            state.isUpdated=false;
          },
        //all product
        updateProductSuccess:(state,action)=>{
            state.product=action.payload;
            state.loading=false;
            state.isUpdated=true;
            // console.log(action.payload);
        },
        updateProductFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.isUpdated=false;
        },
    }
});

export const {
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
} =updateProductSlice.actions;


export default updateProductSlice.reducer;
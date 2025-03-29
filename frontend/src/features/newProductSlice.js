import { createSlice } from '@reduxjs/toolkit';

const initialState={
    product:null,
    loading:false,
    success:false,
    error:null,
}

export const newProductSlice=createSlice({
    name:'Create Product',
    initialState,
    reducers:{
        newProductRequest: (state) => {
            state.loading = true;
            state.success=false;
          },
        //all product
        newProductSuccess:(state,action)=>{
            state.product=action.payload;
            state.loading=false;
            state.success=true;
            // console.log(action.payload);
        },
        newProductFail:(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        resetProduct: (state) => {
            state.success = false;
            state.product = null;
        },
    }
})

export const {
    newProductRequest,
    newProductSuccess,
    newProductFail,
    resetProduct,
    clearErrors,

}=newProductSlice.actions;

export default newProductSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState={
    products:[],
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
            state.products=action.payload;
            state.loading=false;
            state.success=true;
            // console.log(action.payload);
        },
        newProductFail:(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        },
    }
})

export const {
    newProductRequest,
    newProductSuccess,
    newProductFail,

}=newProductSlice.actions;

export default newProductSlice.reducer;
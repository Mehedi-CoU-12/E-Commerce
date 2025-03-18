import { createSlice } from '@reduxjs/toolkit';

const initialState={
    products:[],
    loading:true,
    error:null,
}

export const deleteProductSlice=createSlice({
    name:'Products',
    initialState,
    reducers:{
        deleteProductRequest: (state) => {
            state.loading = true;
          },
        //all product
        deleteProductSuccess:(state,action)=>{
            state.items=action.payload;
            state.loading=false;
        },
        deleteProductFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    }
})

export const {
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,

}=deleteProductSlice.actions;

export default deleteProductSlice.reducer;
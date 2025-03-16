import { createSlice } from '@reduxjs/toolkit';

const initialState={
    products:[],
    loading:false,
    error:null,
}

export const adminProductSlice=createSlice({
    name:'Products',
    initialState,
    reducers:{
        adminProductRequest: (state) => {
            state.loading = true;
          },
        //all product
        adminProductSuccess:(state,action)=>{
            state.products=action.payload;
            state.loading=false;

            // console.log(action.payload);
        },
        adminProductFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    }
})

export const {
    adminProductRequest,
    adminProductSuccess,
    adminProductFail,

}=adminProductSlice.actions;

export default adminProductSlice.reducer;
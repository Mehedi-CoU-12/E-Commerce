import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    products:[],
    loading:false,
    error:null,
}

export const getAllProduct=()=>async(dispatch)=>{
    try {
        dispatch(adminProductRequest());
        const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/products`,{
            withCredentials:true
        })

        dispatch(adminProductSuccess(data?.data));
        
    } catch (error) {
        dispatch(adminProductFail(error));
    }
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
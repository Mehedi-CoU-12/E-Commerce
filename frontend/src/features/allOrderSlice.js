import { createSlice } from "@reduxjs/toolkit";

const initialState={
    orders:[],
    loading:false,
    success:false,
    error:null
};

const allOrderSlice=createSlice({
    name:'All Order',
    initialState,
    reducers:{
        allOrderRequest: (state) => {
            state.loading = true;
        },
        allOrderSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.success = true;
        },
        allOrderFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        resetOrder: (state) => {
            state.success = false;
            state.orders = null;
        },
    }
})

export const {
    allOrderRequest,
    allOrderSuccess,
    allOrderFailed,
    clearErrors,
    resetOrder

} =allOrderSlice.actions;

export default allOrderSlice.reducer;
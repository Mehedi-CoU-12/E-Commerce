import { createSlice } from "@reduxjs/toolkit";

const initialState={
    orders:[],
    loading:true,
    error:null,
    success:false,
};

const deleteOrderSlice=createSlice({
    name:'delete order',
    initialState,
    reducers:{
        deleteOrderRequest: (state) => {
            state.loading = true;
        },
        deleteOrderSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.success = true;
        },
        deleteOrderFailed: (state, action) => {
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
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFailed,
    clearErrors,
    resetOrder
} =deleteOrderSlice.actions;

export default deleteOrderSlice.reducer;
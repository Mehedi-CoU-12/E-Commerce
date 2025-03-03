import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  order: null,
  error: null,
  success: false,
};

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.success = true;
    },
    createOrderFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    resetOrder: (state) => {
      state.success = false;
      state.order = null;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailed,
  clearErrors,
  resetOrder,
} = newOrderSlice.actions;

export default newOrderSlice.reducer;

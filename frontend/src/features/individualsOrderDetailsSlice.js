import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  individualOrder: null,
  error: null,
  success: false,
};

const individualsOrderSlice = createSlice({
  name: "individualOrder",
  initialState,
  reducers: {
    IndOrderRequest: (state) => {
      state.loading = true;
    },
    IndOrderSuccess: (state, action) => {
      state.loading = false;
      state.individualOrder = action.payload;
      state.success = true;
    },
    IndOrderFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    resetIndOrder: (state) => {
      state.success = false;
      state.individualOrder = null;
    },
  },
});

export const {
  IndOrderRequest,
  IndOrderSuccess,
  IndOrderFailed,
  clearErrors,
  resetIndOrder,
} = individualsOrderSlice.actions;

export default individualsOrderSlice.reducer;

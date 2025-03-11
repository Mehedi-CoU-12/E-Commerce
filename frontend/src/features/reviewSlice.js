import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  review: null,
  error: null,
  success: false,
};

const reviewSlice = createSlice({
  name: "individualOrder",
  initialState,
  reducers: {
    reviewRequest: (state) => {
      state.loading = true;
    },
    reviewSuccess: (state, action) => {
      state.loading = false;
      state.review = action.payload; // Fix: Store order correctly
      state.success = true;
    },
    reviewFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    resetReview: (state) => {
      state.success = false;
      state.review = null; // Reset order properly
    },
  },
});

export const {
  reviewRequest,
  reviewSuccess,
  reviewFailed,
  clearErrors,
  resetReview,
} = reviewSlice.actions;

export default reviewSlice.reducer;

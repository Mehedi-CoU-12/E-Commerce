import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviews: [],
    loading: false,
    error: null,
    success: false,
};

const allReviewSlice = createSlice({
  name: "All Reviews",
  initialState,
  reducers: {
    allReviewRequest: (state) => {
      state.loading = true;
    },
    allReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.success = true;
    },
    allReviewFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    resetAllReview: (state) => {
      state.success = false;
      state.reviews = null; 
    },
  },
});

export const {
  allReviewRequest,
  allReviewSuccess,
  allReviewFailed,
  clearErrors,
  resetAllReview,
} = allReviewSlice.actions;

export default allReviewSlice.reducer;

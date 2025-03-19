import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    productDetails: null,
    productCount: 0,
    resultPerPage: 0,
    loading: false,
    error: null,
};

export const productSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        allProductRequest: (state) => {
            state.loading = true;
            state.error = null; // Reset error on new request
        },
        allProductSuccess: (state, action) => {
            state.items = action.payload.products;
            state.productCount = action.payload.productCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.loading = false; // Stop loading when data is fetched
        },
        allProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        
        productDetailsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        productDetailsSuccess: (state, action) => {
            state.loading = false;
            state.productDetails = action.payload;
            state.error = null;
        },
        productDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    allProductRequest,
    allProductSuccess,
    allProductFail,
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFail,
} = productSlice.actions;

export default productSlice.reducer;

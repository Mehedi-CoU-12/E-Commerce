import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:{},
    loading: false,
    error: null,
};

export const userDetailSlice = createSlice({
    name: 'All User',
    initialState,
    reducers: {
        userDetailRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        // Triggered when login succeeds
        userDetailSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        // Triggered when login fails
        userDetailFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        resetUserDetails: (state) => {
            state.user = {}; 
        },
    },
});

export const { 
    userDetailRequest, 
    userDetailSuccess, 
    userDetailFailed ,
    clearErrors,
    resetUserDetails,
 } = userDetailSlice.actions;

export default userDetailSlice.reducer;

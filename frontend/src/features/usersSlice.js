import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    logInUser: {},
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        // Triggered when login starts
        logInRequest: (state) => {
            state.loading = true;
            state.error = null; // Clear previous errors
        },
        // Triggered when login succeeds
        logInSuccess: (state, action) => {
            state.logInUser = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null; // Reset error in case of success
        },
        // Triggered when login fails
        logInFailed: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload; // Set the error
        },
    },
});

export const { logInRequest, logInSuccess, logInFailed } = userSlice.actions;

export default userSlice.reducer;

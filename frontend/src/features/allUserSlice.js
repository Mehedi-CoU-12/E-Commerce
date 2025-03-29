import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    loading: false,
    error: null,
};



export const allUserSlice = createSlice({
    name: 'All User',
    initialState,
    reducers: {
        allUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        // Triggered when login succeeds
        allUserSuccess: (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.error = null;
        },
        // Triggered when login fails
        allUserFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    allUserRequest, 
    allUserSuccess, 
    allUserFailed ,
 } = allUserSlice.actions;

export default allUserSlice.reducer;

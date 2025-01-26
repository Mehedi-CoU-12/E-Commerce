import { createSlice } from '@reduxjs/toolkit';

const initialState={
    user:{},
    isUpdated:false,
    loading:false,
    error:null,
}

export const profileSlice=createSlice({
    name:'Profile',
    initialState,
    reducers:{
        // Triggered when update starts
        updateUserRequest: (state) => {
            state.loading = true;
            state.error = null; // Clear previous errors
        },
        // update user data
        updateUserSuccess:(state,action)=>{
            state.user = {...state.user,...action.payload};
            state.loading = false;
            state.isUpdated=true;
            state.error = null; // Reset error in case of success
        },
        updateUserFailed:(state,action)=>{
            state.loading=false;
            state.isUpdated=false;
            state.error=action.payload;
        },
        //Triggered when update password starts
        updatePasswordRequest:(state)=>{
            state.loading=true;
            state.error=null;
        },
        updatePasswordSuccess:(state,action)=>{
            state.user={...state.user,...action.payload};
            state.loading=false;
            state.isUpdated=true;
            state.error=null;
        },
        updatePasswordFailed:(state,action)=>{
            state.loading=false;
            state.isUpdated=false;
            state.error=action.payload;
        },
    }
});

export const { 
    updateUserRequest,
    updateUserSuccess,
    updateUserFailed,

    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFailed,

 } = profileSlice.actions;

export default profileSlice.reducer;
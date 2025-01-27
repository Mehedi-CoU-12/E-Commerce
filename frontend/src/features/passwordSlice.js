import { createSlice } from '@reduxjs/toolkit';

const initialState={
    user:{},
    loading: false,
    isUpdated: false,
    error: null,
};

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        //Triggered when forgot password starts
        forgotPasswordRequest:(state)=>{
            state.loading=true;
            state.error=null;
        },
        forgotPasswordSuccess:(state,action)=>{
            state.user={...state.user,...action.payload};
            state.loading=false;
            state.isUpdated=true;
            state.error=null;
        },
        forgotPasswordFailed:(state,action)=>{
            state.loading=false;
            state.isUpdated=false;
            state.error=action.payload;
        },

        //Triggered when reset password starts
        resetPasswordRequest:(state)=>{
            state.loading=true;
            state.error=null;
        },
        resetPasswordSuccess:(state,action)=>{
            state.user={...state.user,...action.payload};
            state.loading=false;
            state.isUpdated=true;
            state.error=null;
        },
        resetPasswordFailed:(state,action)=>{
            state.loading=false;
            state.isUpdated=false;
            state.error=action.payload;
        }
    },
});

export const { 
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailed,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailed,
 } = passwordSlice.actions;

export default passwordSlice.reducer;
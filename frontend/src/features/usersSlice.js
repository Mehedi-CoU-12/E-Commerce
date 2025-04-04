import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {  
    logInUser:storedUser || null,
    isAuthenticated:storedUser?true: false,
    loading: false,
    error: null,
};

export const loadUser = () => async (dispatch) => {
    try {
      dispatch(logInRequest());
      const { data } = await axios.get('/api/v1/me');
      dispatch(logInSuccess(data?.data));
    } catch (error) {
      dispatch(logInFailed(error.response?.data?.message || "Authentication failed"));
      // Clear invalid user data
      localStorage.removeItem("user");
    }
  };

// export const loadUser = createAsyncThunk(
//     'user/loadUser',
//     async (_, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.get('/api/v1/me', { 
//                 withCredentials: true 
//             });

//             return data?.data;
//         } catch (error) {
//             return rejectWithValue(error?.data?.message);
//         }
//     }
// );

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
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        // Triggered when login fails
        logInFailed: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload; // Set the error
        },

        //log-out 
        logOutRequest: (state) => {
            state.loading = true;
            state.error = null; // Clear previous errors
        },
        logOutUserSuccess:(state)=>{
            state.logInUser={};
            state.isAuthenticated=false;
            state.loading=false;
            state.error=null;
            localStorage.removeItem("user"); 
        },
        logOutUserFailed:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    },
});

export const { 
    logInRequest, 
    logInSuccess, 
    logInFailed ,
    logOutRequest,
    logOutUserSuccess,
    logOutUserFailed,
 } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

//load the data to initial state
const loadShippingInfoFromLocalStorage=()=>{
    const info=localStorage.getItem("shippingInfo");
    return info? JSON.parse(info):{
        shippingInfo:{
            address:"",
            city:"",
            state:"",
            country:"",
            pinCode:"",
            phoneNo:""
        }
    };
}

//save data to local storage
const saveShippingInfoToLocalStorage=(shipping)=>{
    localStorage.setItem("shippingInfo",JSON.stringify(shipping))
}

const initialState=loadShippingInfoFromLocalStorage();

export const shippingSlice=createSlice({
    name:'Shipping',
    initialState,
    reducers:{
        setShippingInfo:(state,action)=>{
            state.shippingInfo=action.payload;
            saveShippingInfoToLocalStorage(state);
        },
        // Reset shipping information
        resetShippingInfo: (state) => {
            state.shippingInfo = {
                address: "",
                city: "",
                state: "",
                country: "",
                pinCode: "",
                phoneNo: "",
            };
            saveShippingInfoToLocalStorage(state); // Clear from local storage
        },
    }
})

export const {setShippingInfo,resetShippingInfo}=shippingSlice.actions;

export default shippingSlice.reducer;
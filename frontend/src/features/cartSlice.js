import { createSlice } from '@reduxjs/toolkit';

const initialState={
    items:[],
    totalQuantity:0,
    totalPrice:0
};

export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{

            const item=action.payload;
            const existingItem=state.items.find((i)=>i.id===item.id);

            if(existingItem){

                existingItem.quantity++;
                existingItem.totalPrice+=item.price;

            }else{

                state.items.push({...item,quantity:1,totalPrice:item.price});
            }

            state.totalQuantity++;
            state.totalPrice+=item.price;

        },
        removeFromCart:(state,action)=>{

            const id=action.payload;
            const existingItem=state.items.find((i)=>i.id===id);

            if(existingItem){
                state.totalQuantity-=existingItem.quantity;
                state.totalPrice-=existingItem.totalPrice;

                state.items=state.items.filter((i)=>i.id!==id);
            }

        }
    }
})

export const {addToCart,removeFromCart}=cartSlice.actions;

export default cartSlice.reducer;
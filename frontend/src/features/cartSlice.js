import { createSlice } from "@reduxjs/toolkit";

// Load cart from LocalStorage
const loadCartFromLocalStorage = () => {
    const cartData = localStorage.getItem("cartItems");
    return cartData ? JSON.parse(cartData) : { items: [], totalQuantity: 0, totalPrice: 0 };
};

// Save cart to LocalStorage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
};

const initialState = loadCartFromLocalStorage();

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += Number(item.price);
            } else {
                state.items.push({ ...item, quantity: 1, totalPrice: item.price });
            }

            state.totalQuantity++;
            state.totalPrice += Number(item.price);

            // Save updated cart to LocalStorage
            saveCartToLocalStorage(state);
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find((i) => i.id === id);

            if (existingItem) {
                state.totalQuantity -= Number(existingItem.quantity);
                state.totalPrice -= Number(existingItem.totalPrice);

                state.items = state.items.filter((i) => i.id !== id);
            }

            // Save updated cart to LocalStorage
            saveCartToLocalStorage(state);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;

            // Clear LocalStorage
            localStorage.removeItem("cartItems");
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

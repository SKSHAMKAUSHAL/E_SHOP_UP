import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart(state, action){
            // Check if item already exists
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        deleteFromCart(state, action){
            return state.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity(state, action){
            const item = state.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = (item.quantity || 1) + 1;
            }
        },
        decrementQuantity(state, action){
            const item = state.find(item => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        clearCart(){
            return [];
        }
    }
})

export const {addToCart, deleteFromCart, incrementQuantity, decrementQuantity, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
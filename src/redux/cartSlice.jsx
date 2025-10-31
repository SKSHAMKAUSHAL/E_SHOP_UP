import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart(state, action){
            // Consider selectedVariation when identifying unique cart entries
            const payload = action.payload || {};
            const existingItem = state.find(item => (
                item.id === payload.id && ((item.selectedVariation || '') === (payload.selectedVariation || ''))
            ));
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                state.push({ ...payload, quantity: 1 });
            }
        },
        deleteFromCart(state, action){
            const payload = action.payload || {};
            return state.filter(item => !(item.id === payload.id && ((item.selectedVariation || '') === (payload.selectedVariation || ''))));
        },
        incrementQuantity(state, action){
            const payload = action.payload || {};
            const item = state.find(item => (item.id === payload.id && ((item.selectedVariation || '') === (payload.selectedVariation || ''))));
            if (item) {
                item.quantity = (item.quantity || 1) + 1;
            }
        },
        decrementQuantity(state, action){
            const payload = action.payload || {};
            const item = state.find(item => (item.id === payload.id && ((item.selectedVariation || '') === (payload.selectedVariation || ''))));
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
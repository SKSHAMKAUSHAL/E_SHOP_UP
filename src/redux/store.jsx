import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import wishlistSlice from './wishlistSlice'

// Middleware to sync cart and wishlist to localStorage on every state change
const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    
    // Persist cart to localStorage
    if (action.type?.startsWith('cart/')) {
        const cart = store.getState().cart;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Persist wishlist to localStorage
    if (action.type?.startsWith('wishlist/')) {
        const wishlist = store.getState().wishlist;
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    
    return result;
};

export const store = configureStore({
    reducer: {
        cart : cartSlice,
        wishlist: wishlistSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(localStorageMiddleware),
    devTools:true
})
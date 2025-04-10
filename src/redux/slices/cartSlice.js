import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
        console.log("yee shi hai")
      const itemInCart = state.cartItems.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
      state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    clearCart: (state) => {
        state.cartItems = [];
        state.total = 0;
      },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

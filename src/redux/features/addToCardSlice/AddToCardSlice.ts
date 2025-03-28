import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
   slug: string[];
}

const initialState: CartState = {
   slug: [],
};

const addToCartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action: PayloadAction<string>) => {
         console.log('Added slug:', action.payload);
         state.slug.push(action.payload);
      },
   },
});

export const { addToCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;

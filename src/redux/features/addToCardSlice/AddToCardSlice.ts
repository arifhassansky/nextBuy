import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
   slug: string;
   userEmail: string | null;
}

const initialState: CartState = {
   slug: '',
   userEmail: null,
};

const addToCartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action: PayloadAction<string>) => {
         state.id = action.payload;
         state.userEmail = action.payload.userEmail;
      },
   },
});

export const { addToCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;

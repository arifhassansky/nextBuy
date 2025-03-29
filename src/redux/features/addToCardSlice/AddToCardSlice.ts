import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
   userEmail: string | null;
   id: string;
   category: string;
}

const initialState: CartState = {
   userEmail: null,
   id: '',
   category: '',
};

const addToCartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (
         state,
         action: PayloadAction<{
            cart: { _id: string; category: string };
            userEmail: string | null;
         }>,
      ) => {
         const { userEmail, cart } = action.payload;
         const { _id, category } = cart;

         state.userEmail = userEmail;
         state.id = _id;
         state.category = category;
      },
   },
});

export const { addToCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;

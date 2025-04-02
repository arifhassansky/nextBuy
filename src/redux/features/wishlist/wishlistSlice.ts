import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
   userEmail: string | null;
   id: string;
   category: string;
}

const initialState: WishlistState = {
   userEmail: null,
   id: '',
   category: '',
};

const wishlistSlice = createSlice({
   name: 'wishlist',
   initialState,
   reducers: {
      addToWishlist: (
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

export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

// Modify your wishlistSlice to handle the new payload format

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
   id: string;
   userEmail: string | null;
}

const initialState: WishlistState = {
   id: '',
   userEmail: null,
};

const wishlistSlice = createSlice({
   name: 'wishlist',
   initialState,
   reducers: {
      addToWishlist: (state, action: PayloadAction<{ id: string; userEmail: string | null }>) => {
         state.id = action.payload;
         state.userEmail = action.payload.userEmail;
      },
   },
});

export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

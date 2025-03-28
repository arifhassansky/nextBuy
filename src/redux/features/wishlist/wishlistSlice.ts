import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface wishlistState {
   id: string[];
}

const initialState: wishlistState = {
   id: [],
};

const wishlistSlice = createSlice({
   name: ' wishlist',
   initialState,
   reducers: {
      addToWishlist: (state, action: PayloadAction<string>) => {
         console.log('Added id:', action.payload);
         state.id.push(action.payload);
      },
   },
});

export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

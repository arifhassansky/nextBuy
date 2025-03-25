import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define Type for Product
interface Product {
   id: number;
   name: string;
   price: number;
}

// Define Initial State Type
interface ProductState {
   reduxProduct: Product[];
}

const initialState: ProductState = {
   reduxProduct: [],
};

const ProductSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      addProduct: (state, action: PayloadAction<Product>) => {
         state.reduxProduct.push(action.payload);
      },
   },
});

// Export Actions
export const { addProduct } = ProductSlice.actions;
// Export Reducer
export default ProductSlice.reducer;

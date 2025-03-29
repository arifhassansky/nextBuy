import { ProductApi } from '@/redux/ProductApi';

import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import AddToCartReducer from './features/addToCardSlice/AddToCardSlice';
import ProductReducer from './features/productSlice/ProductSlice';
import wishlistSliceReducer from './features/wishlist/wishlistSlice';
export const store = configureStore({
   reducer: {
      productsR: ProductReducer,
      CartR: AddToCartReducer,
      wishlistR: wishlistSliceReducer,

      [ProductApi.reducerPath]: ProductApi.reducer,
   },

   middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
         .prepend(createListenerMiddleware().middleware)
         .concat(ProductApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

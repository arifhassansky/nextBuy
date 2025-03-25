import { ProductApi } from '@/redux/ProductApi';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import ProductReducer from './features/ProductSlice';
export const store = configureStore({
   reducer: {
      productsR: ProductReducer,
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

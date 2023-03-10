import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/users';

export const store = configureStore({
  reducer: userReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: true,
    }),
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

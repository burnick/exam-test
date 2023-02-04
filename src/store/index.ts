import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/users';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import expireReducer from 'redux-persist-expire';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
// const ONE_YEAR = ONE_DAY * 365;

const userPersistConfig = {
  key: 'users',
  storage,

  debug: process.env.NODE_ENV !== 'production',
  transforms: [
    // Create a transformer by passing the reducer key and configuration. Values
    // shown below are the available configurations with default values
    expireReducer('user', {
      expireSeconds: process.env.NODE_ENV !== 'production' ? ONE_DAY : ONE_HOUR * 8,
      autoExpire: true,
    }),
    // You can add more `expireReducer` calls here for different reducers
    // that you may want to expire
  ],
};

const persistedReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  preloadedState: {},
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

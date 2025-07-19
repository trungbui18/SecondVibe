// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slice/authSlice";
import cartSelectedReducer from "./slice/cartSelectedSlice";
import { cartCountReducer, cartDataReducer } from "./slice/cartSelectedSlice";

// Combine các reducer
const rootReducer = combineReducers({
  auth: authReducer,
  cartSelected: cartSelectedReducer,
  cartCount: cartCountReducer,
  cartData: cartDataReducer,
});

// Cấu hình persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartSelected", "cartCount", "cartData"], // persist cả dữ liệu getCart
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

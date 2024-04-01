import { configureStore } from "@reduxjs/toolkit";
import sneakerReducer from "../features/sneakersSlice";
import userReducer from "../features/userSlice";

const loadCartState = () => {
  const serializedState = sessionStorage.getItem("basketState");
  if (serializedState === null) {
    return undefined;
  }
  return JSON.parse(serializedState);
};

export const store = configureStore({
  reducer: {
    sneaker: sneakerReducer,
    user: userReducer,
  },
  preloadedState: {
    sneaker: loadCartState(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

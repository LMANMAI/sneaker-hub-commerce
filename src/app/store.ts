import { configureStore } from "@reduxjs/toolkit";
import sneakerReducer from "../features/sneakersSlice";
export const store = configureStore({
  reducer: {
    sneaker: sneakerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

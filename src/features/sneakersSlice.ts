import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ISneakerState, ISneaker } from "../interfaces";
const initialState: ISneakerState = {
  sneakers: [],
  sneakerActive: null,
  basket: [],
  total: 0,
};

export const sneakerSlice = createSlice({
  name: "sneaker",
  initialState,
  reducers: {
    setSneaker: (state, action: PayloadAction<ISneaker[]>) => {
      state.sneakers = action.payload;
    },
    setSneakerActive: (state, action: PayloadAction<ISneaker | null>) => {
      state.sneakerActive = action.payload;
    },
    setBasket: (state, action: PayloadAction<ISneaker>) => {
      state.basket = [...state.basket, action.payload];
      state.total = state.total + action.payload.price;
    },
    removeSneakerBasket: (state, action: PayloadAction<ISneaker>) => {
      const index = state.basket.findIndex(
        (basketItem) => basketItem._id === action.payload._id
      );
      let tempbasket = [...state.basket];
      if (index >= 0) {
        tempbasket.splice(index, 1);
        state.basket = tempbasket;
        state.total = state.total - action.payload.price;
      } else {
        console.warn(
          `No sé pudo remover el producto: ${action.payload._id} no  esta en el carrito`
        );
      }
    },
  },
});
export const { setSneaker, setSneakerActive, setBasket, removeSneakerBasket } =
  sneakerSlice.actions;

export const selectSneakers = (state: RootState) => state.sneaker.sneakers;
export const selectSneakerActive = (state: RootState) =>
  state.sneaker.sneakerActive;
export const selectBasket = (state: RootState) => state.sneaker.basket;
export const selectTotal = (state: RootState) => state.sneaker.total;

export default sneakerSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ISneakerState, ISneaker } from "../interfaces";
const initialState: ISneakerState = {
  sneakers: [],
  sneakerActive: null,
  basket: [],
  basketQuantity: 0,
  total: 0,
  id: "",
  brands: [],
  search: "",
  counter: 0,
  counterLimit: 0,
  sneakersTotal: [],
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
      const { payload } = action;
      const newItem = state.basket.find((item) => item._id === payload._id);

      if (newItem) {
        newItem.quantity += payload.quantity || 1;
      } else {
        state.basket.push({ ...payload, quantity: payload.quantity || 1 });
      }

      state.total += payload.price * (payload.quantity || 1);
      state.basketQuantity += payload.quantity || 1;
    },
    removeSneakerBasket: (state, action: PayloadAction<ISneaker>) => {
      const { payload } = action;
      const index = state.basket.findIndex((item) => item._id === payload._id);

      if (index !== -1) {
        const removedItem = state.basket[index];
        const removedQuantity = payload.quantity || 1;
        if (removedItem.quantity > removedQuantity) {
          removedItem.quantity -= removedQuantity;
        } else {
          state.basket.splice(index, 1);
        }
        state.total -= removedItem.price * removedQuantity;
        state.basketQuantity -= removedQuantity;
      } else {
        console.warn(
          `No se pudo remover el producto: ${payload._id} no está en el carrito`
        );
      }
    },
    removeOnefromBasket: (state, action: PayloadAction<ISneaker>) => {
      let sneakerToDelete = state.basket.find(
        (item) => item._id === action.payload._id
      );
      if (sneakerToDelete !== undefined) {
        if (sneakerToDelete.quantity > 1) {
          state.basket.map((item) =>
            item._id === action.payload._id ? (item.quantity -= 1) : item
          );
        } else {
          let newBasket = state.basket.filter(
            (item) => item._id !== action.payload._id
          );

          state.basket = newBasket;
        }
        state.total = state.total - action.payload.price;
        state.basketQuantity = state.basketQuantity - 1;
      }
    },

    setIDCollection: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },

    setBrandFilter: (state, action: PayloadAction<string>) => {
      let itemExist = state.brands.find((item) => item === action.payload);
      if (itemExist) {
        let newArray = state.brands.filter((item) => item !== action.payload);
        state.brands = newArray;
        return;
      }
      state.brands = [...state.brands, action.payload];
    },
    removeBrandFilter: (state, action: PayloadAction<string>) => {
      let item = state.brands.find((item) => item === action.payload);
      if (item) {
        let arraytemp = state.brands.filter((item) => item !== action.payload);
        state.brands = arraytemp;
      }
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCounterState: (state, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
    setCounterLimit: (state, action: PayloadAction<number>) => {
      state.counterLimit = action.payload;
    },
    setTotalSneaker: (state, action: PayloadAction<ISneaker[]>) => {
      state.sneakersTotal = action.payload;
    },
  },
});
export const {
  setSneaker,
  setSneakerActive,
  setBasket,
  removeSneakerBasket,
  removeOnefromBasket,
  setIDCollection,
  setBrandFilter,
  removeBrandFilter,
  setSearch,
  setCounterState,
  setCounterLimit,
  setTotalSneaker,
} = sneakerSlice.actions;

export const selectSneakers = (state: RootState) => state.sneaker.sneakers;
export const selectSneakerActive = (state: RootState) =>
  state.sneaker.sneakerActive;
export const selectBasket = (state: RootState) => state.sneaker.basket;
export const selectTotal = (state: RootState) => state.sneaker.total;
export const selectBasketQuantity = (state: RootState) =>
  state.sneaker.basketQuantity;
export const selectIDCollection = (state: RootState) => state.sneaker.id;
export const selecBrands = (state: RootState) => state.sneaker.brands;
export const selectSearch = (state: RootState) => state.sneaker.search;
export const selectCount = (state: RootState) => state.sneaker.counter;
export const selectTotalSneakers = (state: RootState) =>
  state.sneaker.sneakersTotal;
export const selectCountLimit = (state: RootState) =>
  state.sneaker.counterLimit;

export default sneakerSlice.reducer;

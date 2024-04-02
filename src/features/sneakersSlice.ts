import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ISneakerState, ISneaker, ISneakerBasket } from "../interfaces";

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
  exceedsLimit: false,
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
    setBasket: (state, action: PayloadAction<ISneakerBasket>) => {
      const { payload } = action;

      const existingItemIndex = state.basket.findIndex(
        (item) => item._id === payload._id && item.size === payload.size
      );

      const productLimit = payload.limit;

      if (existingItemIndex !== -1) {
        if (state.basket[existingItemIndex].quantity < productLimit) {
          state.basket[existingItemIndex].quantity += 1;
          state.total += payload.price;
          state.basketQuantity += 1;
          state.exceedsLimit = false;
        } else {
          state.exceedsLimit = true;
          console.log("No se puede agregar más del límite de cantidad");
        }
      } else {
        if (payload.quantity < productLimit) {
          state.basket.push(payload);
          state.total += payload.price;
          state.basketQuantity += 1;
          state.exceedsLimit = false;
        } else {
          state.exceedsLimit = true;
          console.log("No se puede agregar más del límite de cantidad");
        }
      }
      sessionStorage.setItem("basketState", JSON.stringify(state));
      localStorage.setItem("basketState", JSON.stringify(state));
    },
    removeOnefromBasket: (state, action: PayloadAction<ISneakerBasket>) => {
      const { payload } = action;

      const existingItemIndex = state.basket.findIndex(
        (item) => item._id === payload._id && item.size === payload.size
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.basket[existingItemIndex];

        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.basket.splice(existingItemIndex, 1);
        }
        state.total -= existingItem.price;
        state.basketQuantity -= 1;
      }
      sessionStorage.setItem("basketState", JSON.stringify(state));
      localStorage.setItem("basketState", JSON.stringify(state));
    },

    removeSneakerBasket: (state, action: PayloadAction<ISneakerBasket>) => {
      const { payload } = action;
      const index = state.basket.findIndex(
        (item) => item._id === payload._id && item.size === payload.size
      );

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
        sessionStorage.setItem("basketState", JSON.stringify(state));
        localStorage.setItem("basketState", JSON.stringify(state));
      } else {
        console.warn(
          `No se pudo remover el producto: ${payload._id} de tamaño ${payload.size} no está en el carrito`
        );
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
    setTotalSneaker: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setBasketQuantity: (state, action: PayloadAction<number>) => {
      state.basketQuantity = action.payload;
    },
    setExceedsLimit: (state, action: PayloadAction<boolean>) => {
      state.exceedsLimit = action.payload;
    },
    clearBasket: (state) => {
      state.basket = [];
      sessionStorage.removeItem("basketState");
      localStorage.removeItem("basketState");
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
  setBasketQuantity,
  setExceedsLimit,
  clearBasket,
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
export const selectExceedsLimit = (state: RootState) =>
  state.sneaker.exceedsLimit;

export default sneakerSlice.reducer;

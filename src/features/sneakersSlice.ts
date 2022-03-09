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
      let newItem = state.sneakers.find(
        (sneaker) => sneaker._id === action.payload._id
      );
      let sneakerCart = state.basket.find((item) => item._id === newItem?._id);

      if (newItem !== undefined) {
        if (sneakerCart) {
          newItem.quantity += 1;
          state.basket.map((item) =>
            item._id === newItem?._id
              ? (item.quantity = item.quantity + 1)
              : item
          );
        } else {
          newItem.quantity = 1;
          state.basket = [...state.basket, newItem];
        }
      }
      state.total = state.total + action.payload.price;
      state.basketQuantity = state.basketQuantity + 1;
    },
    removeSneakerBasket: (state, action: PayloadAction<ISneaker>) => {
      const index = state.basket.findIndex(
        (basketItem) => basketItem._id === action.payload._id
      );
      let tempbasket = [...state.basket];
      if (index >= 0) {
        tempbasket.splice(index, 1);
        state.basket = tempbasket;
        state.total =
          state.total - action.payload.price * action.payload.quantity;
        state.basketQuantity = state.basketQuantity - action.payload.quantity;
      } else {
        console.warn(
          `No sé pudo remover el producto: ${action.payload._id} no  esta en el carrito`
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
export default sneakerSlice.reducer;

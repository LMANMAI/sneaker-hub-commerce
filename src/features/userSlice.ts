import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { IUserState } from "../interfaces";

const initialState: IUserState = {
  user: null,
  autenticated: false,
  menu_height: false,
  error: "",
  id_user: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.autenticated = true;
    },
    setLogOut: (state) => {
      state.user = null;
      state.autenticated = false;
    },
    setMenuHeight: (state, action: PayloadAction<boolean>) => {
      state.menu_height = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setIdUSer: (state, action: PayloadAction<any>) => {
      state.id_user = action.payload;
    },
  },
});
export const { setUser, setLogOut, setMenuHeight, setError, setIdUSer } =
  userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectAutenticated = (state: RootState) => state.user.autenticated;
export const selectMenuHeight = (state: RootState) => state.user.menu_height;
export const selectError = (state: RootState) => state.user.error;
export const selectIDUSer = (state: RootState) => state.user.id_user;
export default userSlice.reducer;

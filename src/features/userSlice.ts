import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { IUserState, IUser } from "../interfaces";

const initialState: IUserState = {
  user: null,
  autenticated: false,
  menu_height: false,
  error: "",
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
  },
});
export const { setUser, setLogOut, setMenuHeight, setError } =
  userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectAutenticated = (state: RootState) => state.user.autenticated;
export const selectMenuHeight = (state: RootState) => state.user.menu_height;
export const selectError = (state: RootState) => state.user.error;
export default userSlice.reducer;

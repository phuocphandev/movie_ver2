import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./thunk";
import { User } from "types/QuanLyNguoiDung";

type quanLyNguoiDung = {
  user?: User;
};
const initialState: quanLyNguoiDung = {
  user: JSON.parse(localStorage.getItem("USER")),
};
const quanLyNguoiDungSlice = createSlice({
  name: "quanLyNguoiDung",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      if (payload) {
        localStorage.setItem("USER", JSON.stringify(payload.accessToken));
      }
    });
  },
});
export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungActions,
} = quanLyNguoiDungSlice;

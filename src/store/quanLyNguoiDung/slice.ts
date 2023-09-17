import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, getUserThunk, updateUserThunk } from "./thunk";
import { User, UserInfo } from "types/QuanLyNguoiDung";
import { toast } from "react-toastify";

type quanLyNguoiDung = {
  user?: User | UserInfo;
  accessToken?: string;
  isUpdateUser?: boolean;
};
const initialState: quanLyNguoiDung = {
  user: undefined,
  accessToken: localStorage.getItem("USER"),
  isUpdateUser: false,
};
const quanLyNguoiDungSlice = createSlice({
  name: "quanLyNguoiDung",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("USER");
      state.accessToken = undefined;
      toast.success("Log out success!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        if (payload) {
          localStorage.setItem("USER", payload.accessToken);
          console.log("payload", payload);
          state.user = payload;
        }
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        // console.log("getUser: ", payload);
      })
      .addCase(updateUserThunk.pending, (state, _) => {
        state.isUpdateUser = true; 
      })
      .addCase(updateUserThunk.fulfilled, (state, _) => {
        state.isUpdateUser = false;
      })
      .addCase(updateUserThunk.rejected, (state, _) => {
        state.isUpdateUser = false;
      });
  },
});
export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungActions,
} = quanLyNguoiDungSlice;

import { createSlice } from "@reduxjs/toolkit";
import { DSUser } from "types/QuanTri";
import { layDSNguoiDungThunk, xoaNguoiDungThunk } from "./thunk";


type QuanTri = {
  DSUser?: DSUser;
  isDelete?: boolean;
  page?: number;
};

const initialState: QuanTri = {
  isDelete: false,
  page: 1,
};

export const QuanTriSlice = createSlice({
  name: "quanTri",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(layDSNguoiDungThunk.fulfilled, (state, { payload }) => {
        state.DSUser = payload.data;
        state.page = payload.pageNow;
      })
      .addCase(xoaNguoiDungThunk.fulfilled, (state, { payload }) => {
        // toast.success(payload);
        console.log("xoaThanhcong ", payload);
        state.isDelete = false;
      })
      .addCase(xoaNguoiDungThunk.rejected, (state, _) => {
        state.isDelete = false;
      })
      .addCase(xoaNguoiDungThunk.pending, (state, _) => {
        state.isDelete = true;
      });
  },
});
export const { reducer: quanTriReducer, actions: QuanTriActions } =
  QuanTriSlice;

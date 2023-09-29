import { createSlice } from "@reduxjs/toolkit";
import { DSUser, timKiemNguoiDung } from "types/QuanTri";
import {
  layDSNguoiDungThunk,
  timKiemNguoiDungThunk,
  xoaNguoiDungThunk,
} from "./thunk";
import { toast } from "react-toastify";

type QuanTri = {
  DSUser?: DSUser;
  isDelete?: boolean;
  page?: number;
  timKiemUser?: timKiemNguoiDung[];
  UpdateUser?: any;
};

const initialState: QuanTri = {
  isDelete: false,
  page: 1,
};

export const QuanTriSlice = createSlice({
  name: "quanTri",
  initialState,
  reducers: {
    luuUser: (state, actions) => {
      state.UpdateUser = actions.payload;
    },
    xoaUser: (state) => {
      state.UpdateUser = null;
    },
    xoaTimKiemUser: (state) => {
      state.timKiemUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(layDSNguoiDungThunk.fulfilled, (state, { payload }) => {
        state.DSUser = payload.data;
        state.page = payload.pageNow;
      })
      .addCase(xoaNguoiDungThunk.fulfilled, (state, { payload }) => {
        toast.success(payload);
        state.isDelete = false;
      })
      .addCase(xoaNguoiDungThunk.rejected, (state, _) => {
        state.isDelete = false;
      })
      .addCase(xoaNguoiDungThunk.pending, (state, _) => {
        state.isDelete = true;
      })
      .addCase(timKiemNguoiDungThunk.fulfilled, (state, { payload }) => {
        state.timKiemUser = payload;
      });
  },
});
export const { reducer: quanTriReducer, actions: QuanTriActions } =
  QuanTriSlice;

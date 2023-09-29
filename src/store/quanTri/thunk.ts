import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanTri } from "services/quanTri";
import { toast } from "react-toastify";

export const layDSNguoiDungThunk = createAsyncThunk(
  "quanTri/layDS",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await QuanTri.layDSNguoiDung(payload);
      return { data: data.data.content, pageNow: payload };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const xoaNguoiDungThunk = createAsyncThunk(
  "quanTri/xoaNguoiDung",
  async (
    payload: { tkXoa: string; pageNow?: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const data = await QuanTri.xoaNguoiDung(payload.tkXoa);
      dispatch(layDSNguoiDungThunk(payload.pageNow));
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
      toast.error(error.response.data.content);
    }
  }
);

export const timKiemNguoiDungThunk = createAsyncThunk(
  "quanTri/TimKiemNguoiDung",
  async (payload:string, { rejectWithValue }) => {
    try {
      const data = await QuanTri.timKiemNguoiDung(payload);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

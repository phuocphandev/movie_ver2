import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyRap } from "services/quanLyRap";

export const quanLyRapThunk = createAsyncThunk(
  "quanLyRap/quanLyRapThunk",
  async (_, { rejectWithValue }) => {
    try {
      const data = await QuanLyRap.HeThongRap();
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const quanLyCumRapThunk = createAsyncThunk(
  "quanLyRap/quanLyCumRapThunk",
  async (payload: string, { rejectWithValue }) => {
    try {
      if (payload) {
        const data = await QuanLyRap.GetCumRap(payload);
        return data.data.content;
      }
      return undefined;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const quanLyLichChieuTheoHeThongThunk = createAsyncThunk(
  "quanLyRap/quanLyLichChieuTheoHeThongThunk",
  async (payload: string, { rejectWithValue }) => {
    try {
      const data = await QuanLyRap.GetLichTheoHeThong(payload);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

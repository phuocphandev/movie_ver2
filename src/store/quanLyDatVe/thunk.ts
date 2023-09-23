import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyDatVe } from "services/quanLyDatVe";
import { DanhSachVe } from "types/QuanLyDatVe";

export const quanLyDatVeThunk = createAsyncThunk(
  "quanLyDatVe/quanLyDatVeThunk",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await quanLyDatVe.getDatVe(payload);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const datVeThunk =createAsyncThunk("quanLyDatVe/datVeThunk",async (payload:DanhSachVe,{rejectWithValue})=>{
  try {
   const data =  await quanLyDatVe.datVe(payload)
    return data
    
  } catch (error) {
    rejectWithValue(error)
    
  }
})

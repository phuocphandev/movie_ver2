import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyPhim } from "services/quanLyPhim";

export const quanLyPhimThunk = createAsyncThunk(
  "quanLyPhim/quanLyPhimThunk",
  async (_, { rejectWithValue }) => {
    try {
      const data = await quanLyPhim.getMovieList();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

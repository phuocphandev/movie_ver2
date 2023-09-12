import { createSlice } from "@reduxjs/toolkit";
import { quanLyPhimThunk } from "./thunk";
import { Movie } from "types/QuanLyPhim";

type QuanLyPhimInitialState = {
  movieList: Movie[];
};
const initialState: QuanLyPhimInitialState = {
    movieList: []
};

export const quanLyPhimSlice = createSlice({
  name: "quanLyPhim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(quanLyPhimThunk.fulfilled, (state, { payload }) => {
     state.movieList=payload
    });
  },
});

export const { reducer: quanLyPhimReducers, actions: quanLyPhimActions } =
  quanLyPhimSlice;

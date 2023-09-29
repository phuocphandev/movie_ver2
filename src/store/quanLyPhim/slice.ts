import { createSlice } from "@reduxjs/toolkit";
import { quanLyPhimThunk } from "./thunk";
import { Movie } from "types/QuanLyPhim";

type QuanLyPhimInitialState = {
  movieList: Movie[];
  isFetchingMovieList: boolean;
};
const initialState: QuanLyPhimInitialState = {
  movieList: [],
  isFetchingMovieList: true,
};

export const quanLyPhimSlice = createSlice({
  name: "quanLyPhim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(quanLyPhimThunk.pending, (state) => {
        state.isFetchingMovieList = true;
      })
      .addCase(quanLyPhimThunk.rejected, (state, _) => {
        state.isFetchingMovieList = false;
      })
      .addCase(quanLyPhimThunk.fulfilled, (state, { payload }) => {
        state.movieList = payload;
        state.isFetchingMovieList = false;
      });
  },
});

export const { reducer: quanLyPhimReducers, actions: quanLyPhimActions } =
  quanLyPhimSlice;

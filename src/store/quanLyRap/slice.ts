import { createSlice } from "@reduxjs/toolkit";
import {
  LayThongTinPhimThunk,
  quanLyCumRapThunk,
  quanLyLichChieuTheoHeThongThunk,
  quanLyRapThunk,
} from "./thunk";
import { CumRapInfo, InfoPhim, LichChieuTheoHeThong, MovieInfo, RapSys } from "types/QuanLyRap";

type QuanLyRapInitialState = {
  heThongRap?: RapSys[];
  cumRap?: CumRapInfo[];
  tenHeThongRapHienTai?: any;
  tenCumRapHientai?: any;
  gioChieuHienTai?:string;
  lichChieuTheoHeThong?: LichChieuTheoHeThong[];
  ngayHienTai?:string,
  DSPhimTheoNgay?:InfoPhim[],
  InfoPhim?:MovieInfo,
  maLichChieu?:number,
 
};
const initialState: QuanLyRapInitialState = {
  heThongRap: [],
  cumRap: [],
  tenHeThongRapHienTai: "BHDStar",
  DSPhimTheoNgay:[],
  

};
export const quanLyRapSlice = createSlice({
  name: "quanLyRap",
  initialState,
  reducers: {
    LuuMaRap: (state, actions) => {
      state.tenHeThongRapHienTai = actions.payload;
    },
    LuuCumRap: (state, actions) => {
      state.tenCumRapHientai = actions.payload;
    },
    luuNgay: (state,actions)=>{
      state.ngayHienTai=actions.payload;
    },
    luuPhimTheoNgay: (state,actions)=>{
      state.DSPhimTheoNgay=actions.payload;
    },
    luuGio:(state,actions)=>{
      state.gioChieuHienTai = actions.payload
    },
    luuMaLichChieu:(state,actions)=>{
      state.maLichChieu=actions.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(quanLyRapThunk.fulfilled, (state, { payload }) => {
        // console.log(payload)
        state.heThongRap = payload;
      })
      .addCase(quanLyCumRapThunk.fulfilled, (state, { payload }) => {
        state.cumRap = payload;
      })
      .addCase(
        quanLyLichChieuTheoHeThongThunk.fulfilled,
        (state, { payload }) => {
          state.lichChieuTheoHeThong = payload;
        }
      )
      .addCase(LayThongTinPhimThunk.fulfilled,(state,{payload})=>{
        state.InfoPhim = payload;
      })
  },
});
export const { reducer: quanLyRapReducer, actions: quanLyRapActions } =
  quanLyRapSlice;

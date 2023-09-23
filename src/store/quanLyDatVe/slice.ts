import { createSlice } from "@reduxjs/toolkit";
import { DSGhe } from "types/QuanLyDatVe";
import { datVeThunk, quanLyDatVeThunk } from "./thunk";
import { toast } from "react-toastify";
export type Ghe = {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: string;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: any;
};
type QuanLyDatVeInitialState = {
  InfoRap?: DSGhe;
  ChairBooking?: Ghe[];
  isDatVe?:boolean;
  isLayThongTin?:boolean,
};

const initialState: QuanLyDatVeInitialState = {
  ChairBooking: [],
  isDatVe:false,
  isLayThongTin:false,
};

export const quanLyDatVeSlice = createSlice({
  name: "quanLyDatVe",
  initialState,
  reducers: {
    setChairBooking: (state, actions) => {
      const index = state.ChairBooking.findIndex(
        (e) => e.maGhe === actions.payload.maGhe
      );

      if (index !== -1) {
        // nếu như đã tồn tại=> xóa khỏi mảng chairbookings
        state.ChairBooking.splice(index, 1);
      } else {
        // nếu chưa tồn tại=> push vào mảng chairbookings
        state.ChairBooking.push(actions.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(quanLyDatVeThunk.pending,(state,_)=>{
      state.isLayThongTin = true;
    })
    .addCase(quanLyDatVeThunk.fulfilled, (state, { payload }) => {
      state.InfoRap = payload;
      state.isLayThongTin = false;
    })
    .addCase(quanLyDatVeThunk.rejected,(state,_)=>{
      state.isLayThongTin = false;
    })
    .addCase(datVeThunk.pending,(state,_)=>{
      state.isDatVe=true;
    })
    .addCase(datVeThunk.fulfilled,(state,_)=>{
      state.isDatVe = false;
      toast.success('Đặt vé thành công');
      state.ChairBooking=[];
    })
    .addCase(datVeThunk.rejected,(state,_)=>{
      state.isDatVe=false;
    })
  },
});
export const { reducer: quanLyDatVeReducers, actions: quanLyDatVeActions } =
  quanLyDatVeSlice;

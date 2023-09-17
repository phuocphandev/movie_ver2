import { createSlice } from "@reduxjs/toolkit"
import { quanLyCumRapThunk, quanLyRapThunk } from "./thunk"
import { CumRapInfo, RapSys } from "types/QuanLyRap"

type QuanLyRapInitialState = {
    heThongRap?:RapSys[],
    cumRap?:CumRapInfo[],
    tenHeThongRapHienTai?: any,
};
const initialState:QuanLyRapInitialState = {
    heThongRap:[],
    cumRap:[],
    tenHeThongRapHienTai:"BHDStar"
}
export const quanLyRapSlice = createSlice({
    name:'quanLyRap',
    initialState,
    reducers:{
        LuuMaRap:(state,actions)=>{
            state.tenHeThongRapHienTai = actions.payload
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(quanLyRapThunk.fulfilled,(state,{payload})=>
        {
            console.log(payload)
            state.heThongRap = payload;
        })
        .addCase(quanLyCumRapThunk.fulfilled,(state,{payload})=>{
            state.cumRap = payload;
          })
    }
    

})
export const {reducer:quanLyRapReducer,actions:quanLyRapActions}=quanLyRapSlice;
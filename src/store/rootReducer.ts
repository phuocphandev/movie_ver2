import {combineReducers} from '@reduxjs/toolkit'
import { quanLyNguoiDungReducer } from './quanLyNguoiDung/slice'
import { quanLyPhimReducers } from './quanLyPhim/slice'
import { quanLyRapReducer } from './quanLyRap/slice'
export const rootReducer = combineReducers({
    quanLyNguoiDung:quanLyNguoiDungReducer,
    quanLyPhim:quanLyPhimReducers,
    quanLyRap:quanLyRapReducer,
})
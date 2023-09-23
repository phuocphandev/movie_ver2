import { apiInstance } from "constant";
import { DSGhe, DanhSachVe } from "types/QuanLyDatVe";

const api = apiInstance({
    baseURL:import.meta.env.VITE_QUAN_LY_DAT_VE_API,
});
export const quanLyDatVe ={
    getDatVe:(payload:number)=> api.get<ApiResponse<DSGhe>>(`/LayDanhSachPhongVe?MaLichChieu=${payload}`),
    datVe: (payload:DanhSachVe)=> api.post('/DatVe',payload),
}
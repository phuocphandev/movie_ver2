import { apiInstance } from "constant";
import { CumRapInfo, RapSys } from "types/QuanLyRap";

const api = apiInstance({
    baseURL:import.meta.env.VITE_QUAN_LY_RAP_API,
})
export const QuanLyRap = {
        HeThongRap :()=>api.get<ApiResponse<RapSys[]>>('/LayThongTinHeThongRap'),
        GetCumRap :(payload:string)=> api.get<ApiResponse<CumRapInfo[]>>(`/LayThongTinCumRapTheoHeThong?maHeThongRap=${payload}`)
};
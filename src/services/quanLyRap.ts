import { apiInstance } from "constant";
import { CumRapInfo, LichChieuTheoHeThong, RapSys } from "types/QuanLyRap";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_RAP_API,
});
export const QuanLyRap = {
  HeThongRap: () => api.get<ApiResponse<RapSys[]>>("/LayThongTinHeThongRap"),
  GetCumRap: (payload: string) =>
    api.get<ApiResponse<CumRapInfo[]>>(
      `/LayThongTinCumRapTheoHeThong?maHeThongRap=${payload}`
    ),
  GetLichTheoHeThong: (payload: string) =>
    api.get<ApiResponse<LichChieuTheoHeThong[]>>(`LayThongTinLichChieuHeThongRap?maHeThongRap=${payload}&maNhom=GP09`),
    // Nếu bị lỗi Type 'WritableDraft<LichChieuTheoHeThong>' is not assignable to type 'ReactNode'thì thêm cái [] sau type generic
};

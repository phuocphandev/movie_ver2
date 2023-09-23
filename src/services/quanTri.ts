import { apiInstance } from "constant";
import { DSUser } from "types/QuanTri";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_NGUOI_DUNG_API,
});
export const QuanTri = {
  layDSNguoiDung: (payload: number) =>
    api.get<ApiResponse<DSUser>>(
      `/LayDanhSachNguoiDungPhanTrang?MaNhom=GP00&soTrang=${payload}&soPhanTuTrenTrang=5`
    ),
  xoaNguoiDung: (payload: string) =>
    api.delete<ApiResponse<string>>(`/XoaNguoiDung?TaiKhoan=${payload}`),
};

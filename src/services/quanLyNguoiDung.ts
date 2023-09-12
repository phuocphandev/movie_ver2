import { apiInstance } from "constant";
import { LoginSchemaType, RegisterSchemaType } from "schema";
import { User } from "types/QuanLyNguoiDung";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_NGUOI_DUNG_API,
})
export const quanLyNguoiDung = {
  register: (payload: RegisterSchemaType) => api.post("/DangKy", payload),
  login: (payload: LoginSchemaType) => api.post<ApiResponse<User>>("/DangNhap", payload),
};

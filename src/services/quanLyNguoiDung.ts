import { apiInstance } from "constant";
import { AccountSchemaType, LoginSchemaType, RegisterSchemaType } from "schema";
import { User, UserInfo } from "types/QuanLyNguoiDung";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_NGUOI_DUNG_API,
});
export const quanLyNguoiDung = {
  register: (payload: RegisterSchemaType) => api.post("/DangKy", payload),
  login: (payload: LoginSchemaType) =>
    api.post<ApiResponse<User>>("/DangNhap", payload),
  getUser: () => api.post<ApiResponse<UserInfo>>("/ThongTinTaiKhoan"),
  updateUser: (payload: AccountSchemaType) =>
    api.put("/CapNhatThongTinNguoiDung", payload),
};

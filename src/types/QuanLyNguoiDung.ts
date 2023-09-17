export type User = {
  accessToken: string;
  email: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  soDT: string;
  taiKhoan: string;
};
export type UserInfo = User & {
  loaiNguoiDung: {
      maLoaiNguoiDung: string
      tenLoai: string
  }
  thongTinDatVe: []
}
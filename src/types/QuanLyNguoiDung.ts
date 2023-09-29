export interface User {
  accessToken?: string;
  matKhau?:string;
  email?: string;
  hoTen?: string;
  maLoaiNguoiDung?: string;
  maNhom?: string;
  soDT?: string;
  taiKhoan?: string;
}
export interface UserInfo extends User {
  loaiNguoiDung?: {
    maLoaiNguoiDung?: string;
    tenLoai?: string;
  };
  thongTinDatVe?: {
    danhSachGhe?: {
      maCumRap?: string;
      maGhe?: number;
      maHeThongRap?: string;
      maRap?: number;
      tenCumRap?: string;
      tenGhe?: string;
      tenHeThongRap?: string;
      tenRap?: string;
    }[];
    giaVe?: number;
    hinhAnh?: string;
    maVe?: number;
    ngayDat?: string;
    tenPhim?: string;
    thoiLuongPhim?: number;
  }[];
}

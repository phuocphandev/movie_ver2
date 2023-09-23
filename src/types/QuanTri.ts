export interface DSUser {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: {
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
    maNhom: any;
    maLoaiNguoiDung: string;
    hoTen: string;
  }[];
}




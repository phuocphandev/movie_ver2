import { AddUserSchemaType } from "schema";

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
export type ApiAddUserType = AddUserSchemaType & {
  maLoaiNguoiDung?: string;
  maNhom?: string;
};
export type timKiemNguoiDung = {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  matKhau: string;
  maLoaiNguoiDung: string;
};

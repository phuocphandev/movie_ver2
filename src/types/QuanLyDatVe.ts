export interface DSGhe {
 thongTinPhim:{
  maLichChieu: number
  tenCumRap: string
  tenRap: string
  diaChi: string
  tenPhim: string
  hinhAnh: string
  ngayChieu: string
  gioChieu: string
 }
 danhSachGhe:{
  maGhe: number
  tenGhe: string
  maRap: number
  loaiGhe: string
  stt: string
  giaVe: number
  daDat: boolean
  taiKhoanNguoiDat: any
 }[]
}
export type DanhSachVe= 
{
    maLichChieu?: any,
    danhSachVe: 
      {
        maGhe?: any,
        giaVe?: any,
      }[]
    
  }




export interface RapSys{
    maHeThongRap: string
    tenHeThongRap: string
    biDanh: string
    logo: string
  }
export interface CumRapInfo {
  maCumRap:string
  tenCumRap:string
  diaChi:string
  danhSachRap:{maRap:string
  tenRap:string}[]
}[]
export interface LichChieuTheoHeThong {
lstCumRap:{
  danhSachPhim:{
    lstLichChieuTheoPhim:{
      maLichChieu:number,
      maRap:string,
      tenRap:string,
      ngayChieuGioChieu:string,
      giaVe:number,
    }[]
    maPhim:number,
    tenPhim:string,
    hinhAnh:string,
    hot:boolean,
    dangChieu:boolean,
    sapChieu:boolean
  }[]
  maCumRap:string,
  tenCumRap:string,
  hinhAnh:string,
  diaChi:string,
}[]
maHeThongRap:string,
tenHeThongRap:string,
logo:string,
mahom:string
}[]

import { useSelector } from "react-redux";
import { RootState } from "store";

export const useTheaterData = () => {
  const {
    heThongRap,
    cumRap,
    tenHeThongRapHienTai,
    lichChieuTheoHeThong,
    tenCumRapHientai,
    ngayHienTai,
    DSPhimTheoNgay,
    InfoPhim,
    gioChieuHienTai,
    maLichChieu,
  } = useSelector((state: RootState) => state.quanLyRap);
  return {
    heThongRap,
    cumRap,
    tenHeThongRapHienTai,
    lichChieuTheoHeThong,
    tenCumRapHientai,
    ngayHienTai,
    DSPhimTheoNgay,
    InfoPhim,
    gioChieuHienTai,
    maLichChieu,
  };
};

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
    DSPhimTheoNgay
  } = useSelector((state: RootState) => state.quanLyRap);
  return {
    heThongRap,
    cumRap,
    tenHeThongRapHienTai,
    lichChieuTheoHeThong,
    tenCumRapHientai,
    ngayHienTai,
    DSPhimTheoNgay
  };
};

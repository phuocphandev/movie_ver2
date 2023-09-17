import { useSelector } from "react-redux";
import { RootState } from "store";

export const useTheaterData =() =>  
{const { heThongRap,cumRap,tenHeThongRapHienTai} = useSelector(
    (state: RootState) => state.quanLyRap
  );
  return {heThongRap,cumRap,tenHeThongRapHienTai};
};
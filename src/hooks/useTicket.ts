import { useSelector } from "react-redux";
import { RootState } from "store";

export const useTicket = () => {
  const { InfoRap, ChairBooking,isDatVe,isLayThongTin } = useSelector(
    (state: RootState) => state.quanLyDatVe
  );
  return { InfoRap, ChairBooking,isDatVe,isLayThongTin };
};

import ChairList from "./ChairList";
// import { baiTapDatVeActions } from '../storeToolkit/BTDatVe/slice'
import Result from "./Result";
import { useAppDispatch } from "store";
import { useEffect } from "react";
import { quanLyDatVeThunk } from "store/quanLyDatVe/thunk";
import { useTheaterData } from "hooks/useTheaterData";

export const ChairBooking = () => {
  const dispatch = useAppDispatch();
  const { maLichChieu } = useTheaterData();
  useEffect(() => {
    if (maLichChieu) {
      dispatch(quanLyDatVeThunk(maLichChieu));
    }
  }, [maLichChieu]);

  return (
    <div className="m-auto mt-5">
      <div className="row grid grid-cols-3">
        <div className="col-span-2 w-[95%]">
          <div
            className="text-center p-3 font-bold bg-gray-700 text-white mt-3  mb-3"
            style={{
              boxShadow:
                "rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px",
            }}
          >
            SCREEN
          </div>

          {/* Dánh sách ghế */}

          <ChairList />
        </div>
        <div className="col-span-1 bg-orange-500 text-white mt-3 rounded-xl">
          {/* Kết quả đặt vé */}
          <Result />
        </div>
      </div>
    </div>
  );
};

export default ChairBooking;

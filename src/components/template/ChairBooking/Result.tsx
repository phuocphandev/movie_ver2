import { useTicket } from "hooks/useTicket";
import { useDispatch } from "react-redux";
import { quanLyDatVeActions } from "store/quanLyDatVe/slice";
import style from "./index.module.scss";
import cn from "classnames";
import { useTheaterData } from "hooks/useTheaterData";
import { DanhSachVe } from "types/QuanLyDatVe";
import { useEffect } from "react";
import { useAppDispatch } from "store";
import { datVeThunk, quanLyDatVeThunk } from "store/quanLyDatVe/thunk";
import { Button } from "components/ui";
// import { baiTapDatVeActions } from '../storeToolkit/BTDatVe/slice'

const Result = () => {
  const { ChairBooking, isDatVe } = useTicket();
  const dispatchOrigin = useDispatch();
  const dispatch = useAppDispatch();
  const { maLichChieu } = useTheaterData();
  let VeDatInfo = [];
  ChairBooking?.map((ve) => {
    VeDatInfo.push({ maGhe: ve.maGhe, giaVe: ve.giaVe });
  });
  let DanhSachVe: DanhSachVe = {
    maLichChieu: maLichChieu,
    danhSachVe: VeDatInfo,
  };
  useEffect(() => {}, [ChairBooking]);
  return (
    <div>
      <h2 className="text-center">DANH SÁCH GHẾ</h2>
      <div className="flex flex-col">
        <button
          className={cn(style.booked, "py-2 px-1 border border-grey-500 mt-3")}
        >
          Ghế đã đặt
        </button>
        <button
          className={cn(style.booking, "py-2 px-1 border border-grey-500 mt-3")}
        >
          Ghế đang chọn
        </button>
        <div>
          <button className="w-[50%] py-2 px-1 border border-grey-500 mt-3 bg-yellow-500">
            Ghế VIP
          </button>
          <button className="w-[50%] py-2 px-1 border border-grey-500 mt-3 bg-slate-400">
            Ghế thường
          </button>
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-10">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Số ghế
            </th>
            <th scope="col" className="px-6 py-3">
              Loại ghế
            </th>
            <th scope="col" className="px-6 py-3">
              Giá
            </th>
            <th scope="col" className="px-6 py-3">
              Hủy
            </th>
          </tr>
        </thead>
        <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          {ChairBooking.map((ghe) => (
            <tr
              key={ghe.maGhe}
              className="hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{ghe.stt}</td>
              <td className="px-6 py-4">
                {ghe.loaiGhe == "Vip" ? "VIP" : "Thường"}
              </td>
              <td className="px-6 py-4">{ghe.giaVe} VND</td>
              <td className="px-6 py-4">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => {
                    dispatchOrigin(quanLyDatVeActions.setChairBooking(ghe));
                  }}
                >
                  Hủy
                </button>
              </td>
            </tr>
          ))}
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td>{ChairBooking.length != 0 ? "Tổng tiền:" : ""}</td>
            {ChairBooking.length != 0 ? (
              <td>
                {ChairBooking.reduce((total, ghe) => (total += ghe.giaVe), 0)}{" "}
                VND
              </td>
            ) : (
              ""
            )}
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      {ChairBooking.length != 0 ? (
        <Button
          loading={isDatVe}
          className="w-full py-3 bg-green-500 rounded-xl"
          type="primary"
          htmlType="submit"
          onClick={() => {
            dispatch(datVeThunk(DanhSachVe))
              .unwrap()
              .then(() => {
                dispatch(quanLyDatVeThunk(maLichChieu));
              });
          }}
        >
          Đặt Vé
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Result;

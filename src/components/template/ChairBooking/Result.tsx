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
  const { maLichChieu, InfoPhim, tenCumRapHientai } = useTheaterData();
  console.log("InfoPhim: ", InfoPhim);
  console.log("tenHeThongRapHienTai: ", tenCumRapHientai);

  const VeDatInfo = [];
  ChairBooking?.map((ve) => {
    VeDatInfo.push({ maGhe: ve.maGhe, giaVe: ve.giaVe });
  });
  const DanhSachVe: DanhSachVe = {
    maLichChieu: maLichChieu,
    danhSachVe: VeDatInfo,
  };
  useEffect(() => {}, [ChairBooking]);
  return (
    <div className={cn("h-[600px]", style.chainsawBG)} style={{}}>
      <h2 className="text-center">DANH SÁCH GHẾ</h2>
      <div className="flex flex-col">
        <button
          className={cn(style.booked, "py-2 px-1 border border-grey-500 mt-3")}
          style={{
            borderRadius: "0% 0% 50% 50% / 0% 0% 50% 50% ",
          }}
        >
          Ghế đã đặt
        </button>
        <button
          className={cn(
            style.booking,
            "py-2 px-1 border border-grey-500 rounded-2xl mt-3"
          )}
          style={{
            borderRadius: "0% 0% 50% 50% / 0% 0% 50% 50% ",
          }}
        >
          Ghế đang chọn
        </button>
        <div className="flex gap-2">
          <button
            className="w-[50%] py-2 px-1 border border-grey-500 mt-3 bg-yellow-500 rounded-xl"
            style={{
              borderRadius: "0% 0% 50% 50% / 0% 0% 50% 50% ",
            }}
          >
            Ghế VIP
          </button>
          <button
            className="w-[50%] py-2 px-1 border border-grey-500 mt-3 bg-slate-400 rounded-xl"
            style={{
              borderRadius: "0% 0% 50% 50% / 0% 0% 50% 50% ",
            }}
          >
            Ghế thường
          </button>
        </div>
      </div>
      {/* //ticket  */}
      <div className="flex flex-col gap-1 ">
        <div className={cn(style.ticket)}>
          <div className={cn(style.ticket_pole_right)}></div>
          <div className={cn(style.ticket_pole_left)}></div>

          <div className="">
            <p>Tên Phim: {InfoPhim?.tenPhim}</p>
          </div>
          <div className="flex justify-between">
            <div className="">
              <p>Ngày chiếu:</p>
              <p>
                {InfoPhim?.ngayKhoiChieu.substring(8, 10)}-
                {InfoPhim?.ngayKhoiChieu.substring(5, 7)}-
                {InfoPhim?.ngayKhoiChieu.substring(0, 4)}
              </p>
            </div>
            <div className="">
              <p>Giờ chiếu:</p>
              <p>{InfoPhim?.ngayKhoiChieu.substring(11, 16)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <p>Tên cụm rạp:</p>
            <p className="uppercase">{tenCumRapHientai}</p>
          </div>
          <div className="flex gap-2">
            <p>Giá:</p>
            <p>
              {ChairBooking.reduce((total, ghe) => (total += ghe?.giaVe), 0)}{" "}
              VND
            </p>
          </div>
          <div className="flex gap-2">
            <p>Ghế:</p>
            <div className="flex gap-2">
              {ChairBooking?.map((ghe) => (
                <div
                  className={cn({
                    "text-orange-500 font-bold": ghe.loaiGhe === "Vip",
                  })}
                >
                  {ghe?.stt},
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* //QR  */}
        <div className={cn(style.ticket_bottom)}>
          <div className={cn(style.ticketQR, "relative pb-2")}>
            <div className={cn(style.ticket_pole_rightbot)}></div>
            <div className={cn(style.ticket_pole_leftbot)}></div>

            <img
              className={cn("relative w-[300px] h-[100px]")}
              src="/image/body/ticketQR.jpg"
              alt="QR"
            />
          </div>
        </div>
      </div>

      {/* Table  */}
      {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-10">
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
      </table> */}
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

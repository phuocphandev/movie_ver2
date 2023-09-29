import { useTicket } from "hooks/useTicket";
import style from "./index.module.scss";
import cn from "classnames";
import { useTheaterData } from "hooks/useTheaterData";
import { DanhSachVe } from "types/QuanLyDatVe";
import { useEffect } from "react";
import { useAppDispatch } from "store";
import { datVeThunk, quanLyDatVeThunk } from "store/quanLyDatVe/thunk";
import { Button } from "components/ui";
import { useAuth } from "hooks/useAuth";
import { toast } from "react-toastify";
// import { baiTapDatVeActions } from '../storeToolkit/BTDatVe/slice'

const Result = () => {
  const { ChairBooking, isDatVe } = useTicket();
  const { isLogin } = useAuth();
  const dispatch = useAppDispatch();
  const {
    maLichChieu,
    InfoPhim,
    tenCumRapHientai,
    ngayHienTai,
    gioChieuHienTai,
  } = useTheaterData();


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
    <div className={cn("px-2 py-4 overflow-hidden border-orange-500 border-[8px] rounded-2xl", style.chainsawBG)} style={{}}>
      <h2 className="text-center  font-bold text-xl">DANH SÁCH GHẾ</h2>
      <div className="flex flex-col">
        <button
          className={cn(
            style.booked,
            "py-2 px-1 border border-grey-500 mt-3 w-[70%] m-auto"
          )}
          style={{
            borderRadius: "0% 0% 50% 50% / 0% 0% 50% 50% ",
          }}
        >
          Ghế đã đặt
        </button>
        <button
          className={cn(
            style.booking,
            "py-2 px-1 border border-grey-500 rounded-2xl mt-3 w-[70%] m-auto"
          )}
          style={{
            borderRadius: "0% 0% 50% 50% / 0% 0% 50% 50% ",
          }}
        >
          Ghế đang chọn
        </button>
        <div className="flex gap-2">
          <button
            className="w-[50%] py-2 px-1 border border-grey-500 mt-3 bg-yellow-500 rounded-xl m-auto"
            style={{
              borderRadius: "0% 0% 50% 50% / 0% 0% 50% 50% ",
            }}
          >
            Ghế VIP
          </button>
          <button
            className="w-[50%] py-2 px-1 border border-grey-500 mt-3 bg-slate-400 rounded-xl m-auto"
            style={{
              borderRadius: "0% 0% 50% 50% / 0% 0% 50% 50% ",
            }}
          >
            Ghế thường
          </button>
        </div>
      </div>
      {/* //ticket  */}
      <div className={cn(style.allTicket,"flex flex-col gap-1 h-[60%] w-[100%] sm:w-[80%] 2xl:max-w-[400px] m-auto mt-10 text-[1em]",{[style.active] : (ChairBooking.length==0?false:true)})}>
        <div className={cn(style.ticket, "h-[80%] text-[1em]")}>
          <div className={cn(style.ticket_pole_right)}></div>
          <div className={cn(style.ticket_pole_left)}></div>

          <div className="text-[1em]">
            <p>
              <span className="text-[#ab2d95] font-bold">Tên Phim:</span>{" "}
              {InfoPhim?.tenPhim}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-[1em] flex gap-2">
              <p className="text-[#ab2d95] font-bold">Ngày chiếu:</p>
              <p>
                {ngayHienTai?.substring(8, 10)}-{ngayHienTai?.substring(5, 7)}-
                {ngayHienTai?.substring(0, 4)}
              </p>
            </div>
            <div className="text-[1em] flex gap-2">
              <p className="text-[#ab2d95] font-bold">Giờ chiếu:</p>
              <p>{gioChieuHienTai}</p>
            </div>
          </div>
          <div className="flex text-[1em]">
            <p className="text-[#ab2d95] font-bold">Tên cụm rạp:</p>
            <p className="uppercase">{tenCumRapHientai}</p>
          </div>
          <div className="flex gap-2 text-[1em]">
            <p className="text-[#ab2d95] font-bold">Giá:</p>
            <p>
              {ChairBooking.reduce((total, ghe) => (total += ghe?.giaVe), 0)}{" "}
              VND
            </p>
          </div>
          <div className="flex gap-2 text-[1em]">
            <p className="text-[#ab2d95] font-bold">Ghế:</p>
            {/* Flex wrap để xuống hàng khi sd flex */}
            <div className="flex text-[1em] flex-wrap gap-1">
              {ChairBooking?.map((ghe) => (
                <p
                  className={cn({
                    "text-orange-500 font-bold": ghe.loaiGhe === "Vip",
                  })}
                >
                  {ghe?.stt},
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* //QR  */}
        <div className={cn(style.ticket_bottom, "")}>
          <div className={cn("relative pb-2")}>
            <div className={cn(style.ticket_pole_rightbot)}></div>
            <div className={cn(style.ticket_pole_leftbot)}></div>

            <img
              className={cn(
                "relative w-[90%] h-[50%] flex justify-center m-auto"
              )}
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
      <div className="my-3">
        {ChairBooking.length != 0 ? (
          <Button
            loading={isDatVe}
            className="py-3 bg-green-500 rounded-xl w-full"
            size="middle"
            type="primary"
            htmlType="submit"
            onClick={() => {
              if (isLogin) {
                dispatch(datVeThunk(DanhSachVe))
                  .unwrap()
                  .then(() => {
                    dispatch(quanLyDatVeThunk(maLichChieu));
                  });
              } else {
                toast.error("Vui lòng đăng nhập tài khoản!");
              }
            }}
          >
            Đặt Vé
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Result;

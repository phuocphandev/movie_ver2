import { useTheaterData } from "hooks/useTheaterData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { quanLyRapActions } from "store/quanLyRap/slice";
import { LayThongTinPhimThunk } from "store/quanLyRap/thunk";
import { ChairBooking } from "../ChairBooking";

const TicketTemp = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const dispatchOrigin = useDispatch();
  const { movieId } = params;
  const {
    InfoPhim,
    tenHeThongRapHienTai,
    tenCumRapHientai,
    ngayHienTai,
    gioChieuHienTai,
  } = useTheaterData();
  useEffect(() => {
    dispatch(LayThongTinPhimThunk(parseInt(movieId, 10)));
  }, []);

  return (
    <div className="w-[80vw] mb-20 m-auto">
      <div className="w-full text-3xl font-bold text-white text-center p-2">
        ĐẶT VÉ XEM PHIM
      </div>
      <div className="">
        <div className="w-full xl:w-[80%] xl:flex flex-cols gap-10 m-auto">
          <div className="w-full xl:w-1/3 xl:border-r-2 border-white p-5">
            <img
              src={InfoPhim?.hinhAnh}
              alt="..."
              className="w-[60%] h-[100%] xl:h-1/2"
            />
            <p className="text-2xl font-bold text-orange-50 ">
              {InfoPhim?.tenPhim}
            </p>
          </div>
          <div className="xl:w-2/3">
            <div className="ml-2 flex flex-col gap-2">
              <div>
                <p
                  className="text-white text-2xl border-l-2 border-b-2 border-orange-500 rounded-xl px-2 py-1"
                  style={{
                    boxShadow:
                      " rgba(240, 143, 45, 0.4) -5px 5px, rgba(240, 143, 45, 0.3) -2px 2px, rgba(240, 143, 45, 0.05) -0px 8px",
                  }}
                >
                  Chọn hệ thống rạp:
                </p>
                <div className="p-3 mt-2 flex gap-5">
                  {InfoPhim?.heThongRapChieu.map((hth) => (
                    <button
                      key={hth?.maHeThongRap}
                      onClick={() => {
                        dispatchOrigin(
                          quanLyRapActions.LuuMaRap(hth?.maHeThongRap)
                        );
                      }}
                    >
                      <div className="flex flex-col justify-center items-center transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110  duration-500">
                        <img className="w-[40px]" src={hth?.logo} alt="..." />
                        <p>{hth?.tenHeThongRap}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="">
                <p
                  className="text-2xl border-l-2 border-b-2 border-orange-500 rounded-xl px-2 py-1 text-white"
                  style={{
                    boxShadow:
                      " rgba(240, 143, 45, 0.4) -5px 5px, rgba(240, 143, 45, 0.3) -2px 2px, rgba(240, 143, 45, 0.05) -0px 8px",
                  }}
                >
                  Chọn cụm rạp:
                </p>
                <div className="flex gap-5 pl-3 mt-3">
                  {InfoPhim?.heThongRapChieu
                    .filter(
                      (rap) => rap?.maHeThongRap == tenHeThongRapHienTai
                    )[0]
                    ?.cumRapChieu.map((cumrap) => (
                      <button
                        key={cumrap?.maCumRap}
                        onClick={() => {
                          dispatchOrigin(
                            quanLyRapActions.LuuCumRap(cumrap?.maCumRap)
                          );
                        }}
                      >
                        <div className="flex flex-col justify-center items-center">
                          <img
                            className="w-[40px]"
                            src={cumrap?.hinhAnh}
                            alt="..."
                          />
                          <p>{cumrap?.tenCumRap}</p>
                        </div>
                      </button>
                    ))}
                </div>
                <p
                  className="text-white  text-2xl border-l-2 border-b-2 border-orange-500 rounded-xl px-2 py-1"
                  style={{
                    boxShadow:
                      " rgba(240, 143, 45, 0.4) -5px 5px, rgba(240, 143, 45, 0.3) -2px 2px, rgba(240, 143, 45, 0.05) -0px 8px",
                  }}
                >
                  Chọn lịch chiếu:
                </p>

                <div>
                  <p
                    className="text-white text-2xl border-l-2 border-b-2 border-orange-500 rounded-xl px-2 py-1"
                    style={{
                      boxShadow:
                        " rgba(240, 143, 45, 0.4) -5px 5px, rgba(240, 143, 45, 0.3) -2px 2px, rgba(240, 143, 45, 0.05) -0px 8px",
                    }}
                  >
                    Chọn giờ chiếu:
                  </p>
                  <div className="text-green-500 p-3 ">
                    {InfoPhim?.heThongRapChieu
                      .filter(
                        (rap) => rap?.maHeThongRap == tenHeThongRapHienTai
                      )[0]
                      ?.cumRapChieu.filter(
                        (cumrap) => cumrap?.maCumRap == tenCumRapHientai
                      )[0]
                      ?.lichChieuPhim?.filter(
                        (ngaychieu) =>
                          ngaychieu?.ngayChieuGioChieu.substring(0, 10) ==
                          ngayHienTai
                      )
                      ?.map((giochieu) => (
                        <button
                          key={giochieu?.maLichChieu}
                          onClick={() => {
                            dispatchOrigin(
                              quanLyRapActions.luuGio(
                                giochieu?.ngayChieuGioChieu.substring(11, 16)
                              )
                            );
                            dispatchOrigin(
                              quanLyRapActions.luuMaLichChieu(
                                giochieu?.maLichChieu
                              )
                            );
                          }}
                        >
                          <span className="bg-white py-1 px-2 rounded-2xl">
                            {giochieu?.ngayChieuGioChieu.substring(11, 16)}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>

                <div>
                  <p
                    className="text-white  text-2xl border-l-2 border-b-2 border-orange-500 rounded-xl px-2 py-1"
                    style={{
                      boxShadow:
                        " rgba(240, 143, 45, 0.4) -5px 5px, rgba(240, 143, 45, 0.3) -2px 2px, rgba(240, 143, 45, 0.05) -0px 8px",
                    }}
                  >
                    Giá vé:
                  </p>
                  <div className="text-green-500 p-3 ">
                    {InfoPhim?.heThongRapChieu
                      .filter(
                        (rap) => rap?.maHeThongRap == tenHeThongRapHienTai
                      )[0]
                      ?.cumRapChieu.filter(
                        (cumrap) => cumrap?.maCumRap == tenCumRapHientai
                      )[0]
                      ?.lichChieuPhim?.filter(
                        (ngaychieu) =>
                          ngaychieu?.ngayChieuGioChieu.substring(0, 10) ==
                            ngayHienTai &&
                          ngaychieu?.ngayChieuGioChieu.substring(11, 16) ==
                            gioChieuHienTai
                      )
                      ?.map((gioChieu) => (
                        <p key={gioChieu.maLichChieu}>
                          <span className="text-green-500 py-1 px-2 rounded-2xl">
                            {gioChieu?.giaVe}VND
                          </span>
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChairBooking />
    </div>
  );
};

export default TicketTemp;

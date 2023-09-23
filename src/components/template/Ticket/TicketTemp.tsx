import { useTheaterData } from "hooks/useTheaterData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { quanLyRapActions } from "store/quanLyRap/slice";
import { LayThongTinPhimThunk } from "store/quanLyRap/thunk";

const TicketTemp = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const dispatchOrigin = useDispatch();
  const { movieId } = params;
  const { InfoPhim, tenHeThongRapHienTai, tenCumRapHientai, ngayHienTai } =
    useTheaterData();
  useEffect(() => {
    dispatch(LayThongTinPhimThunk(parseInt(movieId, 10)));
  }, []);
  console.log(InfoPhim);
  let DSNgay: string[] = [];
  InfoPhim?.heThongRapChieu
    .filter((rap) => rap?.maHeThongRap == tenHeThongRapHienTai)[0]
    ?.cumRapChieu.filter((cumrap) => cumrap?.maCumRap == tenCumRapHientai)[0]
    ?.lichChieuPhim?.map((ngay) => {
      let index = DSNgay.findIndex(
        (item) => item == ngay?.ngayChieuGioChieu.substring(0, 10)
      );
      if ((index = -1)) {
        return DSNgay.push(ngay?.ngayChieuGioChieu.substring(0, 10));
      }
    });
  console.log("DSNgay", DSNgay);

  return (
    <div className="w-[80vw] h-[100vh]">
      <div className="w-full text-3xl font-bold text-white text-center p-2">
        ĐẶT VÉ XEM PHIM
      </div>
      <div className="flex flex-col gap-5 justify-center">
        <div className="w-[80%] flex gap-5 ">
          <img src={InfoPhim?.hinhAnh} alt="..." />
          <p className="text-2xl font-bold text-orange-50 ">
            {InfoPhim?.tenPhim}
          </p>
        </div>

        <div className="ml-2 flex flex-col gap-2">
          <div>
            <p className="text-orange-300 text-2xl">Chọn hệ thống rạp:</p>
            <div className="p-3 mt-2 flex gap-5">
              {InfoPhim?.heThongRapChieu.map((hth) => (
                <button
                  key={hth.maHeThongRap}
                  onClick={() => {
                    dispatchOrigin(quanLyRapActions.LuuMaRap(hth.maHeThongRap));
                  }}
                >
                  <div className="flex flex-col justify-center items-center transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110  duration-500">
                    <img className="w-[40px]" src={hth.logo} alt="..." />
                    <p>{hth.tenHeThongRap}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="">
            <p className="text-orange-300 text-2xl">Chọn cụm rạp:</p>
            <div className="flex gap-5 pl-3 mt-3">
              {InfoPhim?.heThongRapChieu
                .filter((rap) => rap.maHeThongRap == tenHeThongRapHienTai)[0]
                ?.cumRapChieu.map((cumrap) => (
                  <button
                    key={cumrap.maCumRap}
                    onClick={() => {
                      dispatchOrigin(
                        quanLyRapActions.LuuCumRap(cumrap.maCumRap)
                      );
                    }}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <img
                        className="w-[40px]"
                        src={cumrap.hinhAnh}
                        alt="..."
                      />
                      <p>{cumrap.tenCumRap}</p>
                    </div>
                  </button>
                ))}
            </div>
            <p className="text-orange-300  text-2xl">Chọn lịch chiếu:</p>
            <div className="text-green-500 p-3">
              {DSNgay.map((ngay, index) => (
                <button
                  key={index}
                  onClick={() => {
                    dispatchOrigin(quanLyRapActions.luuNgay(ngay));
                  }}
                >
                  <span className="bg-white py-1 px-2 rounded-2xl">
                    {ngay.substring(8, 10)}-{ngay.substring(5, 7)}-
                    {ngay.substring(0, 4)}
                  </span>
                </button>
              ))}
            </div>

            <div>
              <p className="text-orange-300  text-2xl">Chọn giờ chiếu:</p>
              <div className="text-green-500 p-3 ">
                {InfoPhim?.heThongRapChieu
                  .filter((rap) => rap?.maHeThongRap == tenHeThongRapHienTai)[0]
                  ?.cumRapChieu.filter(
                    (cumrap) => cumrap?.maCumRap == tenCumRapHientai
                  )[0]
                  ?.lichChieuPhim?.filter(
                    (ngaychieu) =>
                      ngaychieu.ngayChieuGioChieu.substring(0, 10) ==
                      ngayHienTai
                  )
                  ?.map((giochieu) => (
                    <div key={giochieu.maLichChieu}>
                      <span className="bg-white py-1 px-2 rounded-2xl">
                        {giochieu.ngayChieuGioChieu.substring(11, 16)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketTemp;

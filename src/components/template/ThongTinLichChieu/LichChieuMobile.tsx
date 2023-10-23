import { useDispatch } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { CumRapInfo, LichChieuTheoHeThong, RapSys } from 'types/QuanLyRap';
import { PATH } from "constant";
import cn from "classnames";
import style from "../index.module.scss";
import { quanLyRapActions } from 'store/quanLyRap/slice';

type LichChieuProps = {
    heThongRap: RapSys[];
    cumRap: CumRapInfo[];
    tenCumRapHientai: string;
    lichChieuTheoHeThong: LichChieuTheoHeThong[]

  };

export const LichChieuMobile = ({ heThongRap, cumRap, tenCumRapHientai, lichChieuTheoHeThong }: LichChieuProps) => {
    const dispatchOrigin = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 xl:hidden">
        <div className="flex">
          {/* head cua he thong rap */}
          <div className="ml-2 w-[50px] !border-r-4 border-[#ab2d95]">
            {/* phải có border-r-4 trước rồi mới dùng border màu được */}
            {heThongRap?.map((map) => {
              return (
                <div
                  key={map.maHeThongRap}
                  className="w-[40px] py-2 hover:scale-110 transition ease-in-out duration-500"
                >
                  <button
                    className="w-[40px]"
                    onClick={() => {
                      dispatchOrigin(
                        quanLyRapActions.LuuMaRap(map.maHeThongRap)
                      );
                    }}
                  >
                    <img
                      className="pr-[8px]  sm:!w-[40px]"
                      src={map.logo}
                      alt="..."
                    />
                  </button>
                </div>
              );
            })}
          </div>
          {/* End cua he thong rap */}

          {/* head cua cum rap */}
          <div
            className={cn(
              style.customScrollbar,
              "w-50% ml-2  pr-4 h-[60vh] overflow-y-auto w-full  !border-r-4 border-[#ab2d95]"
            )}
          >
            {cumRap?.map((map) => {
              return (
                <div
                  key={map?.maCumRap}
                  className={cn(
                    "mb-3 cursor-pointer hover:bg-slate-300 transition ease-in-out duration-500 rounded",
                    { "bg-slate-300": map.maCumRap == tenCumRapHientai }
                  )}
                  onClick={() => {
                    dispatchOrigin(quanLyRapActions.LuuCumRap(map.maCumRap));
                  }}
                >
                  <div className="ml-2 flex py-2 items-center">
                    <img
                      className="w-[40px] h-[40px] "
                      src={
                        lichChieuTheoHeThong?.[0].lstCumRap.filter(
                          (prd) => prd?.maCumRap === map.maCumRap
                        )?.[0]?.hinhAnh || "/image/body/theater.jpg"
                      }
                      alt="..."
                    />
                    <div className="ml-2">
                      <p className="font-bold text-[5px] sm:text-[16px]">
                        {map?.tenCumRap}
                      </p>
                      <p className="">{map?.diaChi.substring(0, 20)}...</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* end cua cum rap */}
        </div>
        {/* head cua lich chieu theo he thong */}
        <div
          className={cn(
            "w-full h-[60vh] overflow-y-auto",
            style.customScrollbar
          )}
        >
          {lichChieuTheoHeThong?.[0].lstCumRap
            .filter((prd) => prd.maCumRap === tenCumRapHientai)[0]
            ?.danhSachPhim.map((phim) => {
              const ticketPath2 = generatePath(PATH.ticket, {
                movieId: phim.maPhim,
              });
              return (
                <div key={phim.maPhim}>
                  <div>
                    <div className="flex mb-2 mt-2 px-2">
                      <img className="w-[30%] " src={phim?.hinhAnh} />
                      <div>
                        <p className="ml-2 font-bold text-[#ab2d95] text-xl">
                          {phim?.tenPhim}
                        </p>
                        <p className="font-bold mt-2">
                          <span className="">
                            <span className="text-white">Giờ chiếu: </span>
                            <div
                              className={cn(
                                "grid grid-cols-2 gap-2 overflow-y-auto ",
                                style.customScrollbar
                              )}
                            >
                              <div className=" h-[40vh] col-span-2  ">
                                {phim?.lstLichChieuTheoPhim.map((gio) => (
                                  <div
                                    className="text-[0.7rem] w-[120%] col-span-2 sm:col-span-1 "
                                    key={gio.maLichChieu}
                                  >
                                    <span
                                      className=" text-blue-500 bg-[rgba(248,248,248,0.8)] rounded px-2 w-full cursor-pointer"
                                      onClick={() => {
                                        navigate(ticketPath2);
                                      }}
                                    >
                                      {gio?.ngayChieuGioChieu.substring(8, 10)}/
                                      {gio?.ngayChieuGioChieu.substring(5, 7)}/
                                      {gio?.ngayChieuGioChieu.substring(0, 4)} -{" "}
                                      {gio?.ngayChieuGioChieu.substring(11, 16)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </span>
                        </p>
                      </div>
                    </div>
                    <hr
                      style={{ border: "2px solid #ab2d95", width: "100%" }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
  )
}

export default LichChieuMobile
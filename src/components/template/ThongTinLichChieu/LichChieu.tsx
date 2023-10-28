import { useDispatch } from "react-redux";
import { quanLyRapActions } from "store/quanLyRap/slice";
import { CumRapInfo, LichChieuTheoHeThong, RapSys } from "types/QuanLyRap";
import cn from "classnames";
import style from "../index.module.scss";
import { generatePath, useNavigate } from "react-router-dom";
import { PATH } from "constant";

type LichChieuProps = {
  heThongRap: RapSys[];
  cumRap: CumRapInfo[];
  tenCumRapHientai: string;
  tenHeThongRapHienTai:string;
  lichChieuTheoHeThong: LichChieuTheoHeThong[]
};

export const LichChieu = ({ heThongRap, cumRap, tenCumRapHientai, tenHeThongRapHienTai, lichChieuTheoHeThong }: LichChieuProps) => {
  const dispatchOrigin = useDispatch();
  const navigate = useNavigate();
  
  return (
    <div className="w-[70%] m-auto my-20">
      <div className="text-center mt-5 text-white font-bold text-2xl">
        THÔNG TIN LỊCH CHIẾU
      </div>
      <div className="hidden xl:flex flex-col bg-white mt-7 rounded-lg text-black border-4 border-[#ab2d95] ">
        {/* head cua he thong rap */}
        <div className=" w-[100%] border-b-4 border-[#ab2d95] flex gap-10 ">
          {heThongRap?.map((map) => {
            return (
              <div
                key={map.maHeThongRap}
                className={`w-[100px] py-2 hover:scale-110 transition ease-in-out duration-500  rounded-lg hover:bg-slate-100 bg-transparent ${tenHeThongRapHienTai== map.maHeThongRap ? "!bg-slate-400" : ""}`}
              >
                <button
                  className="w-[40px] flex justify-center items-center m-auto"
                  onClick={() => {
                    dispatchOrigin(quanLyRapActions.LuuMaRap(map.maHeThongRap));
                    // dispatchOrigin(quanLyRapActions.LuuCumRap(cumRap?.[0].maCumRap))
                  }}
                >
                  <img
                    className=" sm:!w-[40px]"
                    src={map.logo}
                    alt="..."
                  />
                </button>
              </div>
            );
          })}
        </div>
        {/* End cua he thong rap */}
        <div className="grid grid-cols-7 ">
          {/* head cua cum rap */}
          <div
             className={cn(
              style.customScrollbar,
              "ml-2 !border-r-4 border-[#ab2d95] pr-4 h-[60vh] overflow-y-auto  overflow-x-auto col-span-2 w-full"
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
          {/* head cua lich chieu theo he thong */}
          <div
            className={cn(
              style.customScrollbar,
              " h-[60vh] overflow-y-auto relative col-span-5"
            )}
          >
            <div className="w-full">
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
                          <img className="w-[30%] h-[40%]" src={phim?.hinhAnh} />
                          <div>
                            <p className="ml-2 font-bold text-[#ab2d95] text-xl">
                              {phim?.tenPhim}
                            </p>
                            <p className="ml-2 font-bold mt-2">
                              <span className=" text-black">
                                <span className="text-white">Giờ chiếu: </span>
                                <div className="grid grid-cols-2">
                                  {phim?.lstLichChieuTheoPhim.map((gio) => (
                                    <div
                                      className="w-full col-span-1"
                                      key={gio.maLichChieu}
                                    >
                                      <span
                                        className=" text-blue-500 bg-[rgba(248,248,248,0.8)] rounded px-2 m-2 w-full cursor-pointer"
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
                              </span>
                            </p>
                          </div>
                        </div>
                        <hr
                          style={{
                            border: "2px solid #ab2d95",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LichChieu;

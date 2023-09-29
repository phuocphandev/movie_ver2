import { EyeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Card, Skeleton } from "components/ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { quanLyPhimThunk } from "store/quanLyPhim/thunk";
import cn from "classnames";
import style from "./index.module.scss";
import { useTheaterData } from "hooks/useTheaterData";
import {
  quanLyCumRapThunk,
  quanLyLichChieuTheoHeThongThunk,
} from "store/quanLyRap/thunk";
import { quanLyRapActions } from "store/quanLyRap/slice";
import { InfoPhim, gioChieu } from "types/QuanLyRap";
import { generatePath, useNavigate } from "react-router-dom";
import { PATH } from "constant";

export const HomeTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dispatchOrigin = useDispatch();
  const { movieList, isFetchingMovieList } = useSelector(
    (state: RootState) => state.quanLyPhim
  );
  const {
    heThongRap,
    cumRap,
    tenHeThongRapHienTai,
    lichChieuTheoHeThong,
    tenCumRapHientai,
    ngayHienTai,
  } = useTheaterData();

  useEffect(() => {
    dispatch(quanLyPhimThunk());
  }, []);

  useEffect(() => {
    dispatch(quanLyCumRapThunk(tenHeThongRapHienTai));
    dispatch(quanLyLichChieuTheoHeThongThunk(tenHeThongRapHienTai));
  }, [tenHeThongRapHienTai]);

  /////
  useEffect(() => {
    let DSPhimTheoNgay: InfoPhim[] = [];
    const lichTheoRap = lichChieuTheoHeThong?.[0].lstCumRap.filter(
      (prd) => prd.maCumRap === tenCumRapHientai
    );
    lichTheoRap?.[0]?.danhSachPhim?.map((phim) => {
      let ds = phim.lstLichChieuTheoPhim?.filter(
        (lichchieu) =>
          lichchieu.ngayChieuGioChieu.substring(0, 10) == ngayHienTai
      );
      let gioChieu: gioChieu[] = [];
      ds?.map((gio) =>
        gioChieu.push({
          gioChieu: gio.ngayChieuGioChieu.substring(11, 16),
          maLichChieu: gio.maLichChieu,
          rapChieu: gio.tenRap,
        })
      );

      if (ds.length != 0) {
        if (phim.hinhAnh != "") {
          const newInfoPhim: InfoPhim = {
            hinhPhim: phim?.hinhAnh,
            tenPhim: phim?.tenPhim,
            maCuaPhim: phim.maPhim,
            gioChieu: gioChieu,
          };
          DSPhimTheoNgay.push(newInfoPhim);
        } else {
          const newInfoPhim: InfoPhim = {
            hinhPhim: "/image/body/theater.jpg",
            tenPhim: phim.tenPhim,
            maCuaPhim: phim.maPhim,
            gioChieu: gioChieu,
            //tại sao dùng : mà k phải =
          };
          DSPhimTheoNgay.push(newInfoPhim);
        }
        // không được dùng biến có new
        // Lỗi this expression is not callable.Type "Number" has no call signatures nếu để length(ds)
      }
    });
    dispatchOrigin(quanLyRapActions.luuPhimTheoNgay(DSPhimTheoNgay));
  }, [ngayHienTai, tenCumRapHientai]);

  if (isFetchingMovieList) {
    return (
      <div className="p-5 rounded-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[30px] mt-10">
          {[...Array(16)].map((_, index) => {
            return (
              <div key={index} className="flex justify-center">
                <Card className="!w-[240px]">
                  <Skeleton.Image active className="!w-full !h-[250px]" />
                  <Skeleton.Input active className="!w-full !mt-10" />
                  <Skeleton.Input active className="!w-full !mt-10" />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className=" p-5 rounded-sm ">
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-[30px] ">
        {movieList?.map((movie) => {
          // Lưu ý: map(()=>{const.... return()}) còn nếu muốn return về 1 cái jsx: map(()=>())
          const detailPath = generatePath(PATH.detail, {
            movieId: movie.maPhim,
          });
          const ticketPath = generatePath(PATH.ticket, {
            movieId: movie.maPhim,
          });
          return (
            // <div className="w-[240px] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110  duration-500">
            <div className="flex justify-center" key={movie.maPhim}>
              <Card
                // hoverable = {true}
                style={{ width: 240, border: "none" }}
                cover={
                  <div className="relative">
                    <img alt="example" src={movie.hinhAnh} className="" />
                    <div className={cn(style.hoverOverlayLayer)}>
                      <button
                        className={cn(
                          style.overlayButtonLeft,
                          "text-yellow-500 "
                        )}
                        onClick={() => {
                          navigate(detailPath);
                        }}
                      >
                        <EyeOutlined />
                      </button>
                      <button
                        className={cn(
                          style.overlayButtonRight,
                          "text-yellow-500"
                        )}
                        onClick={() => navigate(ticketPath)}
                      >
                        <ShoppingOutlined />
                      </button>
                    </div>
                  </div>
                }
                className={cn(
                  style.CardCSS,
                  "transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-500 cursor-pointer"
                )}
              >
                <Card.Meta
                  title={
                    <p
                      className="text-blue-500 font-bold"
                      style={{ whiteSpace: "normal" }}
                    >
                      {movie.tenPhim}
                    </p>
                  }
                  description={
                    <p className="text-red-500 flex justify-center">
                      {movie.moTa.substring(0, 50)}
                    </p>
                  }
                  style={{ color: "red" }}
                />
              </Card>
            </div>
          );
        })}
      </div>
      {isFetchingMovieList ? (
        <div></div>
      ) : (
        <div>
          <div className="text-center mt-5 text-white font-bold">
            THÔNG TIN LỊCH CHIẾU
          </div>
          <div className="hidden xl:flex bg-[rgba(62,67,70,0.73)] mt-7 rounded-lg text-black ">
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
                "w-50% ml-2 !border-r-4 border-[#ab2d95] pr-4 h-[60vh] overflow-y-auto "
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
                "w-[600px] h-[60vh] overflow-y-auto relative"
              )}
            >
              {/* <div
              className="w-full"
              style={{ textAlign: "right", position: "sticky", top: 0 }}
            >
              <div className=" sticky top-0">
                <Space direction="vertical">
                  <DatePicker
                    style={{ background: "beige" }}
                    onChange={onChange}
                    placeholder={ngayHienTai}
                  /> */}
              {/* Note: chinh mau placeholder */}
              {/* </Space>
              </div>
            </div> */}
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
                            <img
                              className="w-[30%] h-[40%]"
                              src={phim?.hinhAnh}
                            />
                            <div>
                              <p className="ml-2 font-bold text-[#ab2d95] text-xl">
                                {phim?.tenPhim}
                              </p>
                              <p className="ml-2 font-bold mt-2">
                                <span className=" text-black">
                                  <span className="text-white">
                                    Giờ chiếu:{" "}
                                  </span>
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
                                          {gio?.ngayChieuGioChieu.substring(
                                            8,
                                            10
                                          )}
                                          /
                                          {gio?.ngayChieuGioChieu.substring(
                                            5,
                                            7
                                          )}
                                          /
                                          {gio?.ngayChieuGioChieu.substring(
                                            0,
                                            4
                                          )}{" "}
                                          -{" "}
                                          {gio?.ngayChieuGioChieu.substring(
                                            11,
                                            16
                                          )}
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
                {/* {DSPhimTheoNgay.map((phim) => {
                return (
                  <div key={phim.maCuaPhim}>
                    <div>
                      <div className="flex mb-2 mt-2 px-2">
                        <img className="w-[50px]" src={phim?.hinhPhim} />
                        <div>
                          <p className="ml-2 font-bold">{phim?.tenPhim}</p>
                          <p className="ml-2 font-bold mt-2">
                            <span className=" text-black">Giờ chiếu:</span>{" "}
                            {phim.gioChieu.map((gio) => (
                              <span
                                key={gio.maLichChieu}
                                className=" text-red-500 bg-[rgba(248,248,248,0.8)] m-2 "
                              >
                                {gio.gioChieu}-{gio.rapChieu}{" "}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                      <hr
                        style={{ border: "2px solid #ab2d95", width: "100%" }}
                      />
                    </div>
                  </div>
                );
              })} */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cum rap for mobile */}
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
    </div>
  );
};

export default HomeTemplate;

import { EyeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { Card } from "components/ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { quanLyPhimThunk } from "store/quanLyPhim/thunk";
import cn from "classnames";
import style from "./index.module.scss";
import { useTheaterData } from "hooks/useTheaterData";

import { quanLyCumRapThunk } from "store/quanLyRap/thunk";
import { quanLyRapActions } from "store/quanLyRap/slice";

export const HomeTemplate = () => {
  const dispatch = useAppDispatch();
  const dispatchOrigin = useDispatch();

  const { movieList, isFetchingMovieList } = useSelector(
    (state: RootState) => state.quanLyPhim
  );
  const { heThongRap, cumRap, tenHeThongRapHienTai } = useTheaterData();
  console.log("tenhethong", tenHeThongRapHienTai);

  useEffect(() => {
    dispatch(quanLyPhimThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(quanLyCumRapThunk(tenHeThongRapHienTai));
  }, [tenHeThongRapHienTai]);

  if (isFetchingMovieList) {
    return (
      <div className="p-5 rounded-sm">
        <div className="grid grid-cols-4 gap-[30px] mt-10">
          {[...Array(16)].map((_, index) => {
            return (
              <Card key={index} className="!w-[240px]">
                <Skeleton.Image active className="!w-full !h-[250px]" />
                <Skeleton.Input active className="!w-full !mt-10" />
                <Skeleton.Input active className="!w-full !mt-10" />
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className=" p-5 rounded-sm ">
      <div className="grid grid-cols-4 gap-[30px]">
        {movieList?.map((movie) => (
          // <div className="w-[240px] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110  duration-500">
          <Card
            key={movie.maPhim}
            // hoverable = {true}
            style={{ width: 240, border: "none" }}
            cover={
              <div className="relative">
                <img alt="example" src={movie.hinhAnh} className="" />
                <div className={cn(style.hoverOverlayLayer)}>
                  <button
                    className={cn(style.overlayButtonLeft, "text-yellow-500 ")}
                  >
                    <EyeOutlined />
                  </button>
                  <button
                    className={cn(style.overlayButtonRight, "text-yellow-500")}
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
        ))}
      </div>
      <div className="bg-[rgba(62,67,70,0.73)] mt-7 rounded-lg text-black flex ">
        {/* head cua he thong rap */}
        <div className="ml-2 w-[50px] !border-r-4 border-[#c85661]">
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
                    dispatchOrigin(quanLyRapActions.LuuMaRap(map.maHeThongRap));
                  }}
                >
                  <img className="w-[40px]" src={map.logo} alt="..." />
                </button>
              </div>
            );
          })}
        </div>
        {/* End cua he thong rap */}

        {/* head cua cum rap */}
        <div className="w-50%">
          {cumRap?.map((map) => {
            return (
              <div key={map?.maCumRap} className="mb-3">
                <div className="ml-2 flex py-2 items-center">
                  <img
                    className="w-[40px] h-[40px] "
                    src="/image/body/theater.jpg"
                    alt="..."
                  />
                  <div className="ml-2">
                    <p className="font-bold">{map?.tenCumRap}</p>
                    <p className="">{map?.diaChi.substring(0, 20)}...</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* end cua cum rap */}
      </div>
    </div>
  );
};

export default HomeTemplate;

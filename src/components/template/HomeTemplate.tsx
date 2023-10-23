import { Card, Skeleton } from "components/ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { quanLyPhimThunk } from "store/quanLyPhim/thunk";
import { useTheaterData } from "hooks/useTheaterData";
import {
  quanLyCumRapThunk,
  quanLyLichChieuTheoHeThongThunk,
} from "store/quanLyRap/thunk";
import { quanLyRapActions } from "store/quanLyRap/slice";
import { InfoPhim, gioChieu } from "types/QuanLyRap";
import { LichChieu, LichChieuMobile } from "./ThongTinLichChieu";
import { MovieList } from "./MovieList";
import { Introduction } from "./Introduction";

export const HomeTemplate = () => {
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
    const DSPhimTheoNgay: InfoPhim[] = [];
    const lichTheoRap = lichChieuTheoHeThong?.[0].lstCumRap.filter(
      (prd) => prd.maCumRap === tenCumRapHientai
    );
    lichTheoRap?.[0]?.danhSachPhim?.map((phim) => {
      const ds = phim.lstLichChieuTheoPhim?.filter(
        (lichchieu) =>
          lichchieu.ngayChieuGioChieu.substring(0, 10) == ngayHienTai
      );
      const gioChieu: gioChieu[] = [];
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
    <div className=" w-full rounded-sm ">
      {/* <Introduction/> */}
      <MovieList movieList={movieList} />
      {isFetchingMovieList ? (
        <div></div>
      ) : (
        <LichChieu
          heThongRap={heThongRap}
          cumRap={cumRap}
          tenCumRapHientai={tenCumRapHientai}
          lichChieuTheoHeThong={lichChieuTheoHeThong}
        />
      )}

      {/* Cum rap for mobile */}
      <LichChieuMobile
        heThongRap={heThongRap}
        cumRap={cumRap}
        tenCumRapHientai={tenCumRapHientai}
        lichChieuTheoHeThong={lichChieuTheoHeThong}
      />
    </div>
  );
};

export default HomeTemplate;

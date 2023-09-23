import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";
import { useAppDispatch } from "store";
import { getUserThunk } from "store/quanLyNguoiDung/thunk";
import { UserInfo } from "types/QuanLyNguoiDung";

export const AccountTicketTab = () => {
  const { user } = useAuth();
  const userInfo = user as UserInfo;
  // typescript vẫn hiểu user mang kiểu type là User | UserInfo nhưng nó k thực sự đang hiểu user lúc này là UserInfo nên phải ép kiểu dùng as
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserThunk());
  }, []);
  return (
    <div className="w-[70vw]">
      {userInfo?.thongTinDatVe?.map((thongTinVe) => {
        return (
          <div className="grid grid-cols-3 border-red-500 border-b-4 mt-2 mb-2 text-white text-xl" key={thongTinVe.maVe}>
            <img src={thongTinVe?.hinhAnh} alt="..." className="col-span-1" />
            {thongTinVe?.danhSachGhe?.map((danhSachGhe,index) => {
              return <div className="col-span-2 ml-4" key={index}>
                <p>Hệ thống rạp: {danhSachGhe?.tenHeThongRap}</p>
                <p>Tên cụm rạp: {danhSachGhe?.tenRap} </p>
                <p>Số ghế: {danhSachGhe?.tenGhe}</p>
                <p>Ngày đặt: {thongTinVe?.ngayDat.substring(8,10)}-{thongTinVe?.ngayDat.substring(5,7)}-{thongTinVe?.ngayDat.substring(0,4)}</p>
                <p>Giá vé: {thongTinVe?.giaVe}VND</p>
              </div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AccountTicketTab;

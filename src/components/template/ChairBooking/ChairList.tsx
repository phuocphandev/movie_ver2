import { useTicket } from "hooks/useTicket";
import cn from "classnames";
import { Ghe, quanLyDatVeActions } from "store/quanLyDatVe/slice";
import { useDispatch } from "react-redux";
import style from "./index.module.scss";
// export type ChairListProps={
//     data?: DSGhe[],
// }
// export const ChairList = (props: ChairListProps) => {

export const ChairList = () => {
  const dispatch = useDispatch();
  const { isLayThongTin } = useTicket();
  const { InfoRap, ChairBooking } = useTicket();
  console.log("ChairBooking", ChairBooking);

  let newArr = [];
  let indexArr = [];
  let index = 0;
  for (var i = 0; i <= InfoRap?.danhSachGhe.length - 1; i++) {
    indexArr.push(InfoRap?.danhSachGhe[i]);
    index++;
    if (index == 10) {
      newArr.push(indexArr);
      index = 0;
      indexArr = [];
    }
  }

  return (
    <div>
      {isLayThongTin == false ? (
        <div>
          {newArr?.map((prd, index) => {
            return (
              <div key={index} className="flex gap-7 w-full justify-evenly">
                {prd?.map((ghe: Ghe) => (
                  <button
                    key={ghe.maGhe}
                    onClick={() => {
                      dispatch(quanLyDatVeActions.setChairBooking(ghe));
                    }}
                    className={cn(
                      "w-[30px] flex justify-center mt-2  border border-black",
                      {
                        "bg-yellow-500": ghe.loaiGhe === "Vip",
                        "bg-slate-400": ghe.loaiGhe === "Thuong",
                        [style.booking]: ChairBooking?.find(
                          (e) => e.maGhe === ghe.maGhe
                        ),
                        [style.booked]: ghe.daDat == true,
                        // "booked":
                      }
                    )}
                  >
                    <p>{ghe.tenGhe}</p>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center translate-x-[38%]">
          <span className="loading loading-ring loading-lg"></span>
          <span>Đang lấy sơ đồ ghế!</span>
        </div>

        // <div className="transform translate-x-[360px] translate-y-[50px] text-white">
        //   <Space direction="vertical" style={{ width: '100%',color:"white" }} >
        //   <Space>
        //     <Spin className="text-white" tip="Đang lấy sơ đồ ghế" size="large"></Spin>
        //   </Space>
        // </Space>
        // </div>
      )}
    </div>
  );
};

export default ChairList;

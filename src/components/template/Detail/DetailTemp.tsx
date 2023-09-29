import {
  BranchesOutlined,
  FireTwoTone,
  ReadOutlined,
  StarFilled,
  setTwoToneColor,
} from "@ant-design/icons";
import { useTheaterData } from "hooks/useTheaterData";
import { useEffect } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { LayThongTinPhimThunk } from "store/quanLyRap/thunk";
import cn from "classnames";
import { PATH } from "constant";

export const DetailTemp = () => {
  const dispatch = useAppDispatch();
  //get ID from param
  const { movieId } = useParams<{ movieId: string }>();
  // console.log("id:", movieId  );
  //Lấy ds film
  const { InfoPhim } = useTheaterData();
  console.log("info Phim: ", InfoPhim);
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(LayThongTinPhimThunk(parseInt(movieId)));
  }, [dispatch, movieId]);

  //antdcolor
  setTwoToneColor("orange");

  //Tách link youtube:
  const videoID= InfoPhim?.trailer.substring(InfoPhim?.trailer.indexOf('=') + 1);
  console.log(videoID);
  const videoLink=`https://www.youtube.com/embed/${videoID}`

  //ticketPath:
  const ticketPath = generatePath(PATH.ticket,{ movieId: movieId});
  console.log(ticketPath);
  
  return (
    <div className="!w-[90vw] pt-10 pb-10 text-white flex-col flex gap-10">
      {/* TRAILER */}
      <div className="w-[80%] m-auto">
        <div className="border-[6px] rounded-xl border-orange-400 " style={{boxShadow:" rgba(199, 230, 24, 0.56) 0px 22px 70px 4px"}}>
          <iframe className="w-full round-xl" height="754" src={videoLink}></iframe>
        </div>
      </div>
      {/*IMG & NAME */}
      <div className="flex gap-5">
        <img
          src={InfoPhim?.hinhAnh}
          className="w-1/2 rounded-md border border-white"
          alt="..."
        />
        <div className="flex flex-col gap-5">
          {/* Name TITLE  */}
          <div className="flex gap-2">
            <p className="font-bold text-[#cba6c9] text-2xl">
              {InfoPhim?.tenPhim}
            </p>
            <FireTwoTone className="text-orange-500 text-3xl" />
          </div>

          {InfoPhim?.sapChieu && (
            <p>
              Date release:{" "}
              <span className="text-red-500 text-xl">Comming soon</span>
            </p>
          )}
          {!InfoPhim?.sapChieu && (
            <div className="">
              <p>
                Date release:{" "}
                <span className="text-green-400 text-xl">
                  {InfoPhim?.ngayKhoiChieu.substring(0, 10)}
                </span>
              </p>
            </div>
          )}
          <p className="flex gap-2">
            <StarFilled className="text-yellow-500" />
            <span
              className={cn(
                { "text-green-500": InfoPhim?.danhGia >= 8 },
                {
                  "text-orange-300":
                    InfoPhim?.danhGia >= 5 && InfoPhim?.danhGia < 8,
                },
                { "text-red-700": InfoPhim?.danhGia < 5 }
              )}
            >
              {InfoPhim?.danhGia}/10
            </span>
          </p>
          <div className="flex gap-5">
            <button className="px-3 py-2 bg-yellow-500 rounded-3xl" onClick={()=> navigate(ticketPath)} >
              Booking
            </button>
            <button className="px-3 py-2 bg-red-500 rounded-3xl" onClick={()=> navigate('/')}>Home</button>
          </div>
        </div>
      </div>
      {/* MoTa  */}
      <div
        className="flex flex-col gap-5 bg-[#424242] bg-opacity-70 w-[80%] m-auto rounded-xl p-5 mt-5"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        }}
      >
        <span className="text-blue-500 font-bold">Storyline:</span>
        <p className="ml-5">{InfoPhim?.moTa}</p>
        <div className="flex justify-end gap-5 text-xl">
          <div className="flex text-green-500">
            <BranchesOutlined />
            <p>Share</p>
          </div>
          <div className="flex text-[#C5CAE9]">
            <ReadOutlined />
            <p>Trivia</p>
          </div>
          <div className="flex text-yellow-500">
            <StarFilled />
            <p>Rate this</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTemp;

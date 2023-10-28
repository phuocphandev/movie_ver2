import { useState } from "react";
export const QuesAndAns = () => {
  const [sec1, setSec1] = useState(true);
  const handleSec1 = () => {
    setSec1(!sec1);
  };
  const [sec2, setSec2] = useState(true);
  const handleSec2 = () => {
    setSec2(!sec2);
  };
  const [sec3, setSec3] = useState(true);
  const handleSec3 = () => {
    setSec3(!sec3);
  };
  const [sec4, setSec4] = useState(true);
  const handleSec4 = () => {
    setSec4(!sec4);
  };
  return (
    <div className="w-full py-[10vh]">
      <div className="border-t-4 border-[#ab2d95] w-[80%] m-auto"></div>
      <div className="w-[70%] flex flex-col mt-3 m-auto">
        {/* head  */}
        <div className="font-bold text-3xl py-10 text-white flex justify-center">
          Câu hỏi thường gặp
        </div>
        <div className="mb-3 flex flex-col gap-3 ">
          {/* sec1 */}
          <div className="bg-white rounded">
            <button
              className="bg-gray-700  rounded text-2xl text-white px-3 py-2 uppercase w-full flex justify-start hover:bg-gray-600  transition-all ease-linear duration-500"
              onClick={handleSec1}
            >
              Movids Là Gì?
            </button>
            <div className={`overflow-hidden `}>
              <div
                className={`overflow-hidden text-xl text-black p-3 transition-all ease-in-out duration-[750ms] md:duration-500 ${
                  sec1 ? "mt-[-180%] md:mt-[-35%]" : "mt-0"
                }`}
              >
                <div className="flex flex-col w-full pl-[10px] pr-[10px] ">
                  <p className="w-full ">
                    Là dịch vụ cung cấp đến đa dạng các loại chương trình truyền
                    hình, phim, anime, phim tài liệu đoạt giải thưởng và nhiều
                    nội dung khác trên hàng nghìn thiết bị có kết nối Internet.
                  </p>
                  <p className="w-full">
                    Bạn có thể xem bao nhiêu tùy thích với giá cả phải chăng,
                    Luôn có những nội dung mới để bạn khám phá và những chương
                    trình truyền hình, phim mới được bổ sung mỗi tuần!
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* sec2  */}
          <div className="bg-white rounded">
            <button
              className="bg-gray-700  rounded text-2xl text-white px-3 py-2 uppercase w-full flex justify-start hover:bg-gray-600  transition-all ease-linear duration-500"
              onClick={handleSec2}
            >
              Tôi phải trả bao nhiêu tiền để xem tại Movids?
            </button>
            <div className={`overflow-hidden `}>
              <div
                className={`overflow-hidden text-xl text-black p-3   transition-all ease-in-out duration-500 ${
                  sec2 ? "mt-[-100%] md:mt-[-35%]" : "mt-0"
                }`}
              >
                <div className="flex flex-col w-full pl-[10px] pr-[10px]">
                  <p className="w-full">
                    Có thể xem phim tại Movids với các gói dịch vụ với mức giá
                    từ 70.000 ₫ đến 260.000 ₫ mỗi tháng. Không phụ phí, không
                    hợp đồng.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Sec3  */}
          <div className="bg-white rounded">
            <button
              className="bg-gray-700  rounded text-2xl text-white px-3 py-2 uppercase w-full flex justify-start hover:bg-gray-600  transition-all ease-linear duration-500"
              onClick={handleSec3}
            >
              Tôi có thể xem ở đâu?
            </button>
            <div className={`overflow-hidden `}>
              <div
                className={`overflow-hidden text-xl text-black p-3  transition-all ease-in-out duration-500 ${
                  sec3 ? "mt-[-100%] md:mt-[-35%]" : "mt-0"
                }`}
              >
                <div className="flex flex-col w-full pl-[10px] pr-[10px] ">
                  <p className="w-full ">
                    Bạn có thể xem tại các hệ thống rạp trên toàn quốc và đặt vé
                    thông qua Movids với nhiều ưu đại đặc biệt.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* sec4  */}
          <div className="bg-white rounded">
            <button
              className="bg-gray-700  rounded text-2xl text-white px-3 py-2 uppercase w-full flex justify-start hover:bg-gray-600  transition-all ease-linear duration-500"
              onClick={handleSec4}
            >
              Tôi có thể xem gì trên Movids?
            </button>
            <div className={`overflow-hidden `}>
              <div
                className={`overflow-hidden text-xl text-black p-3  transition-all ease-in-out duration-500 ${
                  sec4 ? "mt-[-120%] md:mt-[-35%]" : "mt-0"
                }`}
              >
                <div className="flex flex-col w-full pl-[10px] pr-[10px] ">
                  <p className="w-full ">
                    Movids có một thư viện phong phú gồm các phim truyện, phim
                    tài liệu, chương trình truyền hình, anime, tác phẩm giành
                    giải thưởng của Movids và nhiều nội dung khác. Xem không
                    giới hạn bất cứ lúc nào bạn muốn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuesAndAns;

import { PATH } from "constant";
import { generatePath, useNavigate } from "react-router-dom";
import cn from "classnames";
import style from "../index.module.scss";
import { Card } from "components/ui";
import { EyeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Movie } from "types/QuanLyPhim";
//carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type MovieListProps = {
  movieList: Movie[];
};

export const MovieList = ({ movieList }: MovieListProps) => {
  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div
      className=" py-10"
      style={{
        backgroundImage:
          "url('https://demo1.cybersoft.edu.vn/static/media/backapp.b46ef3a1.jpg')",
      }}
    >
      <div className="flex justify-center text-2xl mb-10">Danh Sách Phim</div>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={true}
      >
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
            <div
              className="m-auto flex flex-col justify-center  w-[60%]"
              key={movie.maPhim}
            >
              <Card
                style={{
                  width: "100%",
                  height: "450px",
                  border: "1px solid #e91e63",
                  marginTop: "20px",
                  backgroundImage: `url(${movie?.hinhAnh})`,
                  backgroundSize: "cover",
                  backgroundClip: "content-box",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className={cn(
                  style.CardCSS,
                  "transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-500 cursor-pointer"
                )}
              >
                <div className={cn(style.hoverOverlayLayer)}>
                  <div className="flex gap-5 flex-col items-center justify-center w-[90%] m-auto mt-5">
                    <p className="text-[#e91e63] flex justify-center font-bold text-xl bg-black px-3 py-1 bg-opacity-40 rounded-xl  ease-in-out duration-500 transition-all  hover:-translate-y-2">
                      {movie?.tenPhim}
                    </p>
                    <p className="h-[200px] flex justify-center items-center text-white bg-black px-3 py-1 bg-opacity-40 rounded-xl  ease-in-out duration-500 transition-all  hover:-translate-y-2">
                      {movie?.moTa.length > 260
                        ? `${movie?.moTa.substring(0, 260) + "..."}`
                        : `${movie?.moTa}`}
                    </p>
                  </div>
                  {/* Time road */}
                  <div className="time flex gap-5 justify-center mt-5 border-t-2 border-[#e91e63] w-[90%] m-auto mb-5 ">
                    <div className="flex">
                      <img
                        src="/image/MovieList/clock.png"
                        alt="clock"
                        className="w-[20px] block"
                      />
                      <p className="font-bold text-[var(--tertiary)]">23H</p>
                    </div>
                    <div className="flex">
                      <img
                        src="/image/MovieList/calendar.png"
                        alt="calendar"
                        className="w-[20px] block"
                      />
                      <p className="font-bold text-[var(--tertiary)]">2.5M</p>
                    </div>
                    <div className="flex">
                      <img
                        src="/image/MovieList/enroll.png"
                        alt="enroll"
                        className="w-[20px] block"
                      />
                      <p className="font-bold text-[var(--tertiary)]">3.2k</p>
                    </div>
                  </div>
                  <div className="flex px-5 gap-5">
                    <button
                      className="bg-[white] py-2 px-4 rounded text-[#e91e63] border border-[#e91e63]  w-[90%] m-auto hover:bg-[var(--quaternary)] ease-in-out duration-500 transition-all hover:-translate-y-2"
                      onClick={() => navigate(detailPath)}
                    >
                      Xem chi tiết
                    </button>

                    <button
                      className="bg-[#e91e63] py-2 px-4 rounded text-white  w-[90%] m-auto hover:bg-transparent hover:border-white border border-transparent ease-in-out duration-500 transition-all hover:-translate-y-2"
                      onClick={() => navigate(detailPath)}
                    >
                      Đặt vé
                    </button>
                  </div>
                </div>

                {/* <Card.Meta
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
                /> */}
              </Card>
              <div className="">
                <p
                  className="flex justify-center text-white font-bold text-xl mt-2"
                  style={{ whiteSpace: "normal" }}
                >
                  {movie.tenPhim}
                </p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MovieList;

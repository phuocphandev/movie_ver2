import { Outlet } from "react-router-dom";
import NavBar from "../template/PageHeader/NavBar";
import PageFooter from "../template/PageFooter/PageFooter";

import { Player } from "@lottiefiles/react-lottie-player";
import { useSelector } from "react-redux";
import { RootState } from "store";

export const HomeLayout = () => {

    //BUG
  // if (isFetchingMovieList) {
  //   return (
  //     <div className="bg-red-500 top-0 left-0 absolute w-[100vw] h-[100vh] z-20">
  //       <Player
  //         autoplay
  //         loop
  //         src="../../../public/lottie/catAnhLam.json"
  //         style={{ height: "500px", width: "500px" }}
  //       ></Player>
  //     </div>
  //   );
  // }
  
  return (
    <div
      className="h-full w-full flex flex-col gap-10 relative"
      style={{
        backgroundImage: 'url("/image/body/background.jpg")',
        backgroundPosition: "center",
      }}

    >
      <NavBar />
      <div
        className="rounded-3xl xl:m-auto px-10 py-15 "
        style={{
          background: "linear-gradient(to top, #000428, #004e92)",
          backgroundPosition: "center",
          boxShadow: "#E9C242 0px 20px 30px -10px",
        }}
      >
        <Outlet />
      </div>

      <PageFooter />
    </div>
  );
};

export default HomeLayout;

import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export const LoadingTemp = () => {
  return (
    <div className="h-screen flex flex-col justify-center bg-black fixed top-0 left-0 z-[9999] w-screen overflow-hidden text-white ">
      <DotLottiePlayer
        src="/lottie/LoadingDog.lottie"
        autoplay
        loop
        className="h-[60%]"
      ></DotLottiePlayer>
    </div>
  );
};

export default LoadingTemp;
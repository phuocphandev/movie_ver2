import { Outlet } from "react-router-dom";
import NavBar from "../template/PageHeader/NavBar";
import PageFooter from "../template/PageFooter/PageFooter";

export const HomeLayout = () => {
  
  return (
    <div
      className="h-full w-full flex flex-col gap-10 relative bg-[#927892cb]"
      style={{
        // backgroundImage: 'url("/image/body/background.jpg")',
        backgroundPosition: "center",
      }}

    >
      <NavBar />
      <div
        className="rounded-3xl xl:m-auto w-full"
        // style={{
        //   background: "linear-gradient(to top, #000428, #f1c2ef)",
        //   backgroundPosition: "center",
        //   boxShadow: "#E9C242 0px 20px 30px -10px",
        // }}
      >
        <Outlet />
      </div>

      <PageFooter />
    </div>
  );
};

export default HomeLayout;

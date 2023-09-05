import { Outlet } from "react-router-dom";
import NavBar from "../template/PageHeader/NavBar";
import PageFooter from "../template/PageFooter/PageFooter";

export const AuthLayout = () => {
  return (
    <div className="bg-[#303030] absolute h-full w-full">
      {/* 10vh  */}
        <NavBar />
      <div className="absolute h-[70vh] border border-white w-full top-[10vh]">
        <Outlet />
      </div>
      {/* 20vh */}
        <PageFooter />
    </div>
  );
};

export default AuthLayout;

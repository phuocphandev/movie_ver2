import { Outlet } from "react-router-dom";
import NavBar from "../template/PageHeader/NavBar";
import PageFooter from "../template/PageFooter/PageFooter";

export const HomeLayout = () => {
  return (
    <div className="bg-[#303030] h-full w-full flex flex-col gap-10">
      <NavBar />
      
      <div className="bg-[rgba(238,95,109,0.8)] rounded-3xl m-auto px-10 py-15">
        <Outlet />
      </div>

      <PageFooter />
    </div>
  );
};

export default HomeLayout;

import { AdminNavbar } from "components";
import { Outlet } from "react-router-dom";
export const AdminLayout = () => {
  return (
    <div
      className="grid grid-cols-5 h-[100vh] overflow-hidden gap-0"
      style={{ backgroundImage: 'url("/image/body/background.jpg")' }}
    >
      <div className="col-span-1">
        <AdminNavbar />
      </div>
      <div className=" col-span-4 flex items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

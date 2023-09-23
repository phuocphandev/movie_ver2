import { AdminNavbar } from "components"
import { Outlet } from "react-router-dom";
export const AdminLayout = () => {
  return (
    <div className="grid grid-cols-3 w-full h-[100vh]" style={{backgroundImage: 'url("/image/body/background.jpg")'}}>
      <AdminNavbar className="!relative col-span-1"/>
      <Outlet className="!relative col-span-2"/>
    </div>
  )
}

export default AdminLayout
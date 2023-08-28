import { Outlet } from "react-router-dom"
import NavBar from "../template/PageHeader/NavBar"
import PageFooter from "../template/PageFooter/PageFooter"


export const AuthLayout = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <PageFooter />
    </div>
  )
}

export default AuthLayout
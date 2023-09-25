import { RouteObject } from "react-router-dom";
import { AccountInfo, Login, Register } from "pages";
import PATH from "constant/config";
import Home from "pages/Home";
import AuthLayout from "components/layouts/AuthLayout";
import HomeLayout from "components/layouts/HomeLayout";
import { AdminLayout } from "components";
import Detail from "pages/detail/Detail";
import Ticket from "pages/ticket/Ticket";
import { AdminFilm, AdminUser } from "pages/admin";


// import Register from "pages/account/Register";

export const router: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: PATH.login,
        index: true
      },
      {
        element: <Register />,
        path: PATH.register
      },

    ],
  },
  {
    element: <AccountInfo/>,
    path: PATH.account
  },
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Detail />,
        path: PATH.detail,
      },
      {
        element: <Ticket/>,
        path: PATH.ticket,
      },
    ],
  },
  {
    element: <AdminLayout />,
    path:PATH.admin,
    children: [
      {
        element: <AdminFilm />,
        path: PATH.adminFilm, 
      },
      {
        element: <AdminUser/>,
        index:true,
      }
    ]
  }
];

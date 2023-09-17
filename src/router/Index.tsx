import { RouteObject } from "react-router-dom";
import { AccountInfo, Login, Register } from "pages";
import PATH from "constant/config";
import Home from "pages/Home";
import AuthLayout from "components/layouts/AuthLayout";
import HomeLayout from "components/layouts/HomeLayout";
import { AdminLayout, FilmAdd, FilmManage } from "components";
import { AdminFilm, AdminUser } from "pages/admin";
import AccountInTemplate from "components/template/Account/AccountInTemplate";


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
    element: <AccountInTemplate/>,
    path: PATH.account
  },
  {
    element: <HomeLayout />,
    children: [
      {
        element: <Home />,
        path: '/',
        index: true
      }
    ],
  },
  {
    element: <AdminLayout />,
    path:PATH.admin,
    children: [
      {
        element: <AdminFilm />,
        path: PATH.adminFilm,
        children: [
          {
            element: <FilmManage/>,
            path: PATH.adminFilmManage,
            index:true
          },
          {
            element: <FilmAdd/>,
            path: PATH.adminFilmAdd,
          }
        ]
      },
      {
        element: <AdminUser />,
        path: PATH.adminUser
      }
    ]
  }
];

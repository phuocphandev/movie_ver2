import { RouteObject } from "react-router-dom";
import { Login, Register } from "pages";
import PATH from "constant/config";
import Home from "pages/Home";
import AuthLayout from "components/layouts/AuthLayout";
import HomeLayout from "components/layouts/HomeLayout";


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
    element: <HomeLayout/>,
    children: [
      {
        element:<Home/>,
        path:'/',
        index:true
      }
    ],
  },
];

import { RouteObject } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import Account from "pages/account/Account";
import { Login, Register } from "pages";
import PATH from "constants/config";
import Home from "pages/account/Home";

// import Register from "pages/account/Register";

export const router: RouteObject[] = [
  {
    element: <Account />,
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
    element: <AuthLayout />,
    children: [
      {
        element:<Home/>,
        path:'/',
        index:true
      }
    ],
  },
];

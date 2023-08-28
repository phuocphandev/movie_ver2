import { RouteObject } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";

export const router: RouteObject[] = [
    {
        element: <AuthLayout/>,
        path:'/',
        children: [
            
        ]
    }
]
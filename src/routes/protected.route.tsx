import type {RouteObject} from "react-router-dom";
import HomePage from "@/pages/home";

export const protectedRoutes: RouteObject[] = [
    {
        path: "/dashboard",
        element: <HomePage />,
    }
]
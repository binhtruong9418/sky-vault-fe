import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {publicRoutes} from "@/routes/public.routes";
import {protectedRoutes} from "@/routes/protected.route.tsx";
import {AuthGuard} from "@/routes/middleware/AuthGuard.tsx";
import {NoAuthGuard} from "@/routes/middleware/NoAuthGuard.tsx";
import NotFoundPage from "@/pages/not-found";
import LandingLayout from "@/components/layout/LandingLayout.tsx";
import DashboardLayout from "@/components/layout/DashboardLayout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: publicRoutes.map((route) => ({
            ...route,
            element: (
                <NoAuthGuard>
                    {route.element}
                </NoAuthGuard>
            ),
        }))
    },
    {
        path: "/",
        element: <DashboardLayout />,
        children: protectedRoutes.map((route) => ({
            ...route,
            element: (
                <AuthGuard>
                    {route.element}
                </AuthGuard>
            )
        }))
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
]);

export const AppRoutes = () => {
    return (
        <RouterProvider router={router}/>
    )
}
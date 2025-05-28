import LoginPage from "@/pages/login"
import RegisterPage from "@/pages/register"
import ForgotPasswordPage from "@/pages/forgot-password"
import ResetPasswordPage from "@/pages/reset-password"
import ConfirmEmailPage from "@/pages/confirm-email"
import LandingPage from "@/pages/landing"
import type { RouteObject } from "react-router-dom"

export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
    },
    {
        path: "/confirm-email",
        element: <ConfirmEmailPage />,
    },
]

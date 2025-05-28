import {type ReactNode, useMemo} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {LOCAL_STORAGE_KEY} from "@/lib/constants.ts";

interface GuestGuardProps {
    children: ReactNode;
    redirectPath?: string;
}

export const NoAuthGuard = (
    {
        children,
        redirectPath = '/home'
    }: GuestGuardProps) => {
    const location = useLocation();
    const pathname = location.pathname;
    // Get the redirect path from location state or use default
    const from = location.state?.from?.pathname || redirectPath;

    const isAuthenticated = useMemo(
        () => !!window.localStorage.getItem(LOCAL_STORAGE_KEY.JWT_KEY),
        [pathname]
    );

    // If user is already authenticated, redirect them away from guest pages
    if (isAuthenticated) {
        return <Navigate to={from} replace/>;
    }

    // Otherwise, render the guest page component
    return <>{children}</>;
};

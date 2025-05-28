import { Navigate, useLocation } from 'react-router-dom';
import {type ReactNode, useMemo} from "react";
import {LOCAL_STORAGE_KEY} from "@/lib/constants.ts";



export const AuthGuard = ({ children }: {children: ReactNode}) => {
    const location = useLocation();
    const {pathname} = location;

    const isAuthenticated = useMemo(
        () => !!window.localStorage.getItem(LOCAL_STORAGE_KEY.JWT_KEY),
        [pathname]
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
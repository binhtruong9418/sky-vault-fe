import QueryProvider from "@/providers/QueryProvider.tsx";
import UpdateProvider from "@/providers/UpdateProvider.tsx";
import {AppRoutes} from "@/routes/AppRoutes.tsx";
import { Suspense } from "react";

function App() {

    return (
        <QueryProvider>
            <Suspense fallback={'Loading...'}>
                <UpdateProvider>
                    <AppRoutes/>
                </UpdateProvider>
            </Suspense>
        </QueryProvider>
    )
}

export default App

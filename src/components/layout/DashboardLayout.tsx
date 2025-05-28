import { Outlet } from "react-router-dom"
import DashboardSidebar from "./DashboardSidebar"
import DashboardHeader from "./DashboardHeader"

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-gray-50">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader />
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

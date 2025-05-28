"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
    Cloud,
    Home,
    FolderOpen,
    Share2,
    Star,
    Trash2,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "My Files", href: "/dashboard/files", icon: FolderOpen },
    { name: "Shared", href: "/dashboard/shared", icon: Share2 },
    { name: "Starred", href: "/dashboard/starred", icon: Star },
    { name: "Trash", href: "/dashboard/trash", icon: Trash2 },
]

const bottomNavigation = [
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Help", href: "/dashboard/help", icon: HelpCircle },
]

export default function DashboardSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const location = useLocation()

    return (
        <div
            className={cn(
                "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
                isCollapsed ? "w-16" : "w-64",
            )}
        >
            {/* Logo */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <Link to="/dashboard" className="flex items-center space-x-2">
                        <Cloud className="h-8 w-8 text-primary" />
                        {!isCollapsed && <span className="text-xl font-bold text-gray-900">CloudDrive</span>}
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className={cn(
                                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100",
                                        isCollapsed ? "justify-center" : "justify-start",
                                    )}
                                >
                                    <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                                    {!isCollapsed && item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Bottom Navigation */}
            <div className="p-4 border-t border-gray-200">
                <ul className="space-y-2">
                    {bottomNavigation.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className={cn(
                                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100",
                                        isCollapsed ? "justify-center" : "justify-start",
                                    )}
                                >
                                    <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                                    {!isCollapsed && item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Search, Bell, User, Settings, LogOut, ChevronDown, Upload } from "lucide-react"
import { useAuth } from "@/store"

export default function DashboardHeader() {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const profileRef = useRef<HTMLDivElement>(null)
    const { user, clearUser } = useAuth()

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleLogout = () => {
        clearUser()
        localStorage.removeItem("JWT_KEY")
    }

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-lg">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search files and folders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <Button className="flex items-center space-x-2">
                        <Upload className="h-4 w-4" />
                        <span>Upload</span>
                    </Button>

                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{user?.name || "User"}</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                <Link
                                    to="/dashboard/profile"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <User className="mr-3 h-4 w-4" />
                                    Profile
                                </Link>
                                <Link
                                    to="/dashboard/settings"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <Settings className="mr-3 h-4 w-4" />
                                    Settings
                                </Link>
                                <hr className="my-1" />
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    <LogOut className="mr-3 h-4 w-4" />
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

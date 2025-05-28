"use client"

import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, RefreshCw, Cloud, Search, HelpCircle } from "lucide-react"

export default function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-4xl w-full text-center">
                {/* 404 Illustration */}
                <div className="mb-8 sm:mb-12 relative mx-auto w-64 sm:w-80 h-64 sm:h-80 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            {/* Main circle */}
                            <div className="w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                                {/* 404 Text */}
                                <div className="text-center">
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                        404
                                    </h2>
                                    <Cloud className="h-12 w-12 text-blue-500 mx-auto opacity-50" />
                                </div>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <Search className="h-8 w-8 text-white" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <HelpCircle className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-12 space-y-6 sm:space-y-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
                        Oops! Page not found
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                        The page you're looking for seems to have wandered off into the cloud. Don't worry, we'll help you find your
                        way back.
                    </p>

                    {/* Suggestion box */}
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 mb-8 max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-3 text-blue-700">
                            <Search className="h-5 w-5" />
                            <p className="text-sm font-medium">Double-check the URL or try searching for what you need</p>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <Link to="/">
                            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base">
                                <Home className="h-5 w-5" />
                                Go to Homepage
                            </Button>
                        </Link>
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outline"
                            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white hover:shadow-lg transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Go Back
                        </Button>
                        <Button
                            onClick={() => window.location.reload()}
                            variant="outline"
                            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white hover:shadow-lg transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
                        >
                            <RefreshCw className="h-5 w-5" />
                            Reload Page
                        </Button>
                    </div>

                    {/* Help section */}
                    <div className="text-center text-gray-500">
                        <p className="text-sm">
                            Still having trouble?{" "}
                            <Link to="/contact" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                                Contact our support team
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

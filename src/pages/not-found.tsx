import {
    FaHome,
    FaArrowLeft,
    FaSadTear,
    FaExclamationTriangle,
    FaInfoCircle,
} from "react-icons/fa"
import { BiError} from "react-icons/bi"
import { IoMdRefresh, IoMdPlanet } from "react-icons/io"
import { MdOutlineSignalWifiOff, MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

export default function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
            <div className="max-w-3xl w-full text-center">
                {/* 404 Icon Illustration */}
                <div className="mb-8 relative mx-auto w-64 h-64 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center animate-float">
                        <div className="relative">
                            {/* Planet/World Background */}
                            <IoMdPlanet className="text-blue-100 text-[200px]" />

                            {/* 404 Text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-5xl font-bold text-blue-800">404</h2>
                            </div>

                            {/* Sad Face */}
                            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                                <FaSadTear className="text-blue-500 text-4xl animate-pulse" />
                            </div>

                            {/* Disconnected Icons */}
                            <MdOutlineSignalWifiStatusbarConnectedNoInternet4 className="absolute top-10 right-10 text-red-500 text-3xl" />
                            <BiError className="absolute top-20 left-10 text-orange-500 text-3xl animate-bounce" />
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                    <FaExclamationTriangle className="text-yellow-500" />
                    <span>Page Not Found</span>
                </h1>

                <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto flex items-center justify-center">
                    <FaInfoCircle className="mr-2 text-blue-500" />
                    Sorry, the page you are looking for does not exist or has been moved to a different address.
                </p>

                {/* Connection check suggestion */}
                <div className="mb-8 bg-blue-50 rounded-lg p-4 flex items-center justify-center gap-3 max-w-md mx-auto">
                    <MdOutlineSignalWifiOff className="text-blue-600 text-xl flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                        Check your internet connection or ensure the URL entered is correct.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
                    >
                        <FaHome className="text-lg" />
                        <span>Go to Homepage</span>
                    </Link>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition shadow-sm"
                    >
                        <FaArrowLeft className="text-lg" />
                        <span>Go Back</span>
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-200 transition shadow-sm"
                    >
                        <IoMdRefresh className="text-lg" />
                        <span>Reload Page</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, Cloud } from "lucide-react"

export default function LandingHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Cloud className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold text-gray-900">CloudDrive</span>
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Get Started</Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-primary">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                                <Link to="/login">
                                    <Button variant="ghost" className="w-full">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button className="w-full">Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

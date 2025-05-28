import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">YourBrand</h3>
                        <p className="text-gray-300 mb-4">
                            Providing modern technology solutions and high-quality services to customers.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FaFacebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FaTwitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FaInstagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FaLinkedin className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FaYoutube className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-300 hover:text-white">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-300 hover:text-white">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services/web-development" className="text-gray-300 hover:text-white">
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/mobile-development" className="text-gray-300 hover:text-white">
                                    Mobile App Development
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/ui-ux-design" className="text-gray-300 hover:text-white">
                                    UI/UX Design
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/consulting" className="text-gray-300 hover:text-white">
                                    Tech Consulting
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/cloud-services" className="text-gray-300 hover:text-white">
                                    Cloud Services
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <address className="not-italic text-gray-300 space-y-2">
                            <p>123 ABC Street, XYZ District</p>
                            <p>Ho Chi Minh City, Vietnam</p>
                            <p>Email: info@yourbrand.com</p>
                            <p>Phone: (84) 123-456-789</p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-300 text-sm">
                        © {new Date().getFullYear()} YourBrand. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0">
                        <ul className="flex space-x-6">
                            <li>
                                <Link to="/privacy-policy" className="text-gray-300 hover:text-white text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-service" className="text-gray-300 hover:text-white text-sm">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/cookie-policy" className="text-gray-300 hover:text-white text-sm">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
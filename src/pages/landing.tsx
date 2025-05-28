import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Cloud, Shield, Zap, Users, Check, ArrowRight, Upload, Share2, Lock } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary/10 via-blue-50 to-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Your files, everywhere you are</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Store, sync, and share your files securely in the cloud. Access your documents, photos, and videos from
                            any device, anywhere in the world.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register">
                                <Button size="lg" className="text-lg px-8 py-3">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/auth/login">
                                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need in one place</h2>
                        <p className="text-xl text-gray-600">Powerful features to help you manage your files efficiently</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Upload</h3>
                            <p className="text-gray-600">
                                Drag and drop files or folders to upload them instantly to your cloud storage.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Share2 className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Sharing</h3>
                            <p className="text-gray-600">
                                Share files and folders with anyone using secure links with customizable permissions.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Bank-level Security</h3>
                            <p className="text-gray-600">
                                Your files are protected with enterprise-grade encryption and security measures.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why choose CloudDrive?</h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Shield className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Enterprise Security</h3>
                                        <p className="text-gray-600">Advanced encryption and security protocols protect your data.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Zap className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                                        <p className="text-gray-600">Upload and download files at incredible speeds.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Users className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Team Collaboration</h3>
                                        <p className="text-gray-600">Work together seamlessly with real-time collaboration tools.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="text-center">
                                <Cloud className="h-24 w-24 text-primary mx-auto mb-6" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Start your free trial</h3>
                                <p className="text-gray-600 mb-6">
                                    Get 15GB of free storage and access to all premium features for 30 days.
                                </p>
                                <Link to="/register">
                                    <Button size="lg" className="w-full">
                                        Create Free Account
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
                        <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Free Plan */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                            <p className="text-gray-600 mb-6">Perfect for personal use</p>
                            <div className="text-4xl font-bold text-gray-900 mb-6">
                                $0<span className="text-lg text-gray-600">/month</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-3" />
                                    <span>15GB storage</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-3" />
                                    <span>File sharing</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-3" />
                                    <span>Mobile apps</span>
                                </li>
                            </ul>
                            <Link to="/register">
                                <Button variant="outline" className="w-full">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-primary text-primary-foreground rounded-2xl p-8 relative">
                            <div className="absolute top-4 right-4 bg-white text-primary text-xs font-semibold px-3 py-1 rounded-full">
                                Popular
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Pro</h3>
                            <p className="text-primary-foreground/80 mb-6">For professionals and small teams</p>
                            <div className="text-4xl font-bold mb-6">
                                $9<span className="text-lg text-primary-foreground/80">/month</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-white mr-3" />
                                    <span>1TB storage</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-white mr-3" />
                                    <span>Advanced sharing</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-white mr-3" />
                                    <span>Priority support</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-white mr-3" />
                                    <span>Version history</span>
                                </li>
                            </ul>
                            <Link to="/register">
                                <Button variant="secondary" className="w-full">
                                    Start Free Trial
                                </Button>
                            </Link>
                        </div>

                        {/* Business Plan */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
                            <p className="text-gray-600 mb-6">For growing businesses</p>
                            <div className="text-4xl font-bold text-gray-900 mb-6">
                                $19<span className="text-lg text-gray-600">/month</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-3" />
                                    <span>Unlimited storage</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-3" />
                                    <span>Team management</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-3" />
                                    <span>Admin controls</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-3" />
                                    <span>24/7 support</span>
                                </li>
                            </ul>
                            <Link to="/register">
                                <Button variant="outline" className="w-full">
                                    Contact Sales
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

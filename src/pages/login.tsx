"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2, Cloud, CheckCircle } from "lucide-react"
import { LOCAL_STORAGE_KEY } from "@/lib/constants"
import { loginSchema, type LoginFormData } from "@/lib/validations/auth"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/dashboard"
    const message = location.state?.message

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            console.log("Login data:", data)
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Simulate different responses based on email
            if (data.email === "blocked@example.com") {
                throw new Error("Your account has been temporarily blocked. Please contact support.")
            }
            if (data.email === "unverified@example.com") {
                throw new Error("Please verify your email address before signing in.")
            }
            if (data.email === "wrong@example.com") {
                throw new Error("Invalid email or password. Please try again.")
            }

            localStorage.setItem(LOCAL_STORAGE_KEY.JWT_KEY, "fake-jwt-token")
            navigate(from, { replace: true })
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
                        <Cloud className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold text-gray-900">CloudDrive</span>
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
                </div>

                {/* Success message */}
                {message && (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{message}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email address</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                                <Input placeholder="john@example.com" type="email" className="pl-10" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                                <Input
                                                    placeholder="••••••••"
                                                    type={showPassword ? "text" : "password"}
                                                    className="pl-10 pr-10"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center justify-between">
                                <FormField
                                    control={form.control}
                                    name="rememberMe"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {/* Submit button */}
                        <Button type="submit" disabled={isLoading || !form.formState.isValid} className="w-full" size="lg">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>

                        {/* Sign up link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/register" className="font-medium text-primary hover:text-primary/80">
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </form>
                </Form>

                {/* Demo credentials */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
                    <div className="text-xs text-blue-700 space-y-1">
                        <p>
                            <strong>Valid:</strong> demo@example.com / password123!
                        </p>
                        <p>
                            <strong>Blocked:</strong> blocked@example.com
                        </p>
                        <p>
                            <strong>Unverified:</strong> unverified@example.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

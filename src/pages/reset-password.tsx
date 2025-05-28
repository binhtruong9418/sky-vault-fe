"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PasswordStrength } from "@/components/ui/password-strength"
import { Lock, Eye, EyeOff, AlertCircle, Loader2, Cloud, CheckCircle } from "lucide-react"
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations/auth"

export default function ResetPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [tokenValid, setTokenValid] = useState<boolean | null>(null)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const token = searchParams.get("token")
    const email = searchParams.get("email")

    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
    })

    const watchedPassword = form.watch("password")

    // Validate token on component mount
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setTokenValid(false)
                return
            }

            try {
                // Simulate token validation
                await new Promise((resolve) => setTimeout(resolve, 1000))

                // Simulate expired token
                if (token === "expired") {
                    setTokenValid(false)
                    setError("This reset link has expired. Please request a new one.")
                    return
                }

                setTokenValid(true)
            } catch {
                setTokenValid(false)
                setError("Invalid or expired reset link.")
            }
        }

        validateToken()
    }, [token])

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) return

        setIsLoading(true)
        setError(null)

        try {
            console.log("Reset password data:", { ...data, token, email })
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            setIsSuccess(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to reset password. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    // Loading state while validating token
    if (tokenValid === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-gray-600">Validating reset link...</p>
                </div>
            </div>
        )
    }

    // Invalid token state
    if (!tokenValid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
                            <Cloud className="h-8 w-8 text-primary" />
                            <span className="text-2xl font-bold text-gray-900">CloudDrive</span>
                        </Link>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="h-8 w-8 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Invalid Reset Link</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {error || "This password reset link is invalid or has expired."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Link to="/forgot-password">
                            <Button className="w-full" size="lg">
                                Request New Reset Link
                            </Button>
                        </Link>

                        <div className="text-center">
                            <Link to="/login" className="text-sm font-medium text-primary hover:text-primary/80">
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Success state
    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
                            <Cloud className="h-8 w-8 text-primary" />
                            <span className="text-2xl font-bold text-gray-900">CloudDrive</span>
                        </Link>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Password reset successful</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Your password has been successfully reset. You can now sign in with your new password.
                        </p>
                    </div>

                    <Button
                        onClick={() =>
                            navigate("/login", {
                                state: { message: "Password reset successful! You can now sign in with your new password." },
                            })
                        }
                        className="w-full"
                        size="lg"
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        )
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
                    <h2 className="text-3xl font-bold text-gray-900">Reset your password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {email ? `Resetting password for ${email}` : "Enter your new password below"}
                    </p>
                </div>

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
                            {/* Password field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New password</FormLabel>
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

                            {/* Password strength indicator */}
                            {watchedPassword && <PasswordStrength password={watchedPassword} />}

                            {/* Confirm Password field */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm new password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                                <Input
                                                    placeholder="••••••••"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="pl-10 pr-10"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Submit button */}
                        <Button type="submit" disabled={isLoading || !form.formState.isValid} className="w-full" size="lg">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resetting password...
                                </>
                            ) : (
                                "Reset password"
                            )}
                        </Button>

                        {/* Back to login */}
                        <div className="text-center">
                            <Link to="/login" className="text-sm font-medium text-primary hover:text-primary/80">
                                Back to Sign In
                            </Link>
                        </div>
                    </form>
                </Form>

                {/* Demo note */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                        <strong>Demo:</strong> Add "?token=expired" to URL to see expired token error
                    </p>
                </div>
            </div>
        </div>
    )
}

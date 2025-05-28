"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Mail, AlertCircle, Loader2, Cloud, ArrowLeft, CheckCircle, Clock } from "lucide-react"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth"

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    const navigate = useNavigate()

    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            console.log("Forgot password data:", data)
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Simulate email not found
            if (data.email === "notfound@example.com") {
                throw new Error("No account found with this email address.")
            }

            setIsSuccess(true)
            setResendCooldown(60) // 60 seconds cooldown

            // Countdown timer
            const timer = setInterval(() => {
                setResendCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send reset email. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleResend = () => {
        setIsSuccess(false)
        setError(null)
    }

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
                        <h2 className="text-3xl font-bold text-gray-900">Check your email</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            We've sent a password reset link to{" "}
                            <span className="font-medium text-gray-900">{form.getValues("email")}</span>
                        </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex">
                            <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">What's next?</h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <ol className="list-decimal list-inside space-y-1">
                                        <li>Check your email inbox (and spam folder)</li>
                                        <li>Click the reset link in the email</li>
                                        <li>Create a new password</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button onClick={() => navigate("/login")} className="w-full" size="lg">
                            Back to Sign In
                        </Button>

                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Didn't receive the email?</p>
                            {resendCooldown > 0 ? (
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    <span>Resend available in {resendCooldown}s</span>
                                </div>
                            ) : (
                                <button onClick={handleResend} className="text-sm font-medium text-primary hover:text-primary/80">
                                    Try again
                                </button>
                            )}
                        </div>
                    </div>
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
                    <h2 className="text-3xl font-bold text-gray-900">Forgot your password?</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        No worries! Enter your email address and we'll send you a link to reset your password.
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
                                    <FormDescription>Enter the email address associated with your account</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit button */}
                        <Button type="submit" disabled={isLoading || !form.formState.isValid} className="w-full" size="lg">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending reset link...
                                </>
                            ) : (
                                "Send reset link"
                            )}
                        </Button>

                        {/* Back to login */}
                        <div className="text-center">
                            <Link
                                to="/login"
                                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Sign In
                            </Link>
                        </div>
                    </form>
                </Form>

                {/* Demo note */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-xs text-yellow-700">
                        <strong>Demo:</strong> Try "notfound@example.com" to see email not found error
                    </p>
                </div>
            </div>
        </div>
    )
}

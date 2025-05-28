"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Mail, CheckCircle, Loader2, Cloud, RefreshCw, AlertCircle, Hash } from "lucide-react"
import { verifyEmailSchema, type VerifyEmailFormData } from "@/lib/validations/auth"

export default function ConfirmEmailPage() {
    const [isResending, setIsResending] = useState(false)
    const [resendSuccess, setResendSuccess] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    const [isVerifying, setIsVerifying] = useState(false)
    const [verificationError, setVerificationError] = useState<string | null>(null)
    const [isVerified, setIsVerified] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const email = location.state?.email || ""
    const message = location.state?.message
    const autoToken = searchParams.get("token")

    const form = useForm<VerifyEmailFormData>({
        resolver: zodResolver(verifyEmailSchema),
        mode: "onChange",
    })

    useEffect(() => {
        if (!email) {
            navigate("/register")
        }
    }, [email, navigate])

    // Auto-verify if token is in URL
    useEffect(() => {
        if (autoToken) {
            handleAutoVerification(autoToken)
        }
    }, [autoToken])

    const handleAutoVerification = async (token: string) => {
        setIsVerifying(true)
        setVerificationError(null)

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))

            if (token === "invalid") {
                throw new Error("Invalid verification token")
            }

            setIsVerified(true)
        } catch (err) {
            setVerificationError(err instanceof Error ? err.message : "Verification failed")
        } finally {
            setIsVerifying(false)
        }
    }

    const onSubmit = async (data: VerifyEmailFormData) => {
        setIsVerifying(true)
        setVerificationError(null)

        try {
            console.log("Verify email data:", { ...data, email })
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Simulate invalid code
            if (data.code === "000000") {
                throw new Error("Invalid verification code. Please try again.")
            }
            if (data.code === "111111") {
                throw new Error("Verification code has expired. Please request a new one.")
            }

            setIsVerified(true)
        } catch (err) {
            setVerificationError(err instanceof Error ? err.message : "Verification failed")
        } finally {
            setIsVerifying(false)
        }
    }

    const handleResendEmail = async () => {
        setIsResending(true)
        setResendSuccess(false)
        setVerificationError(null)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setResendSuccess(true)
            setResendCooldown(60)

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
        } catch {
            setVerificationError("Failed to resend verification email")
        } finally {
            setIsResending(false)
        }
    }

    // Auto-verification in progress
    if (isVerifying && autoToken) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-gray-600">Verifying your email...</p>
                </div>
            </div>
        )
    }

    // Verification successful
    if (isVerified) {
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
                        <h2 className="text-3xl font-bold text-gray-900">Email verified!</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Your email has been successfully verified. You can now access all features of CloudDrive.
                        </p>
                    </div>

                    <Button
                        onClick={() =>
                            navigate("/login", {
                                state: { message: "Email verified successfully! You can now sign in to your account." },
                            })
                        }
                        className="w-full"
                        size="lg"
                    >
                        Continue to Sign In
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
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Verify your email</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We've sent a 6-digit verification code to <span className="font-medium text-gray-900">{email}</span>
                    </p>
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

                {/* Resend success message */}
                {resendSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            <div className="ml-3">
                                <p className="text-sm text-green-700">Verification code sent successfully!</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error message */}
                {verificationError && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{verificationError}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Verification form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <Input placeholder="123456" maxLength={6} className="pl-10" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Enter the 6-digit code from your email</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isVerifying || !form.formState.isValid} className="w-full" size="lg">
                            {isVerifying ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify Email"
                            )}
                        </Button>
                    </form>
                </Form>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex">
                        <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Check your email</h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Look for an email from CloudDrive</li>
                                    <li>Check your spam/junk folder if needed</li>
                                    <li>The code expires in 10 minutes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resend section */}
                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                    {resendCooldown > 0 ? (
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Resend available in {resendCooldown}s</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleResendEmail}
                            disabled={isResending}
                            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 disabled:opacity-50"
                        >
                            {isResending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Resend verification code
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Demo codes */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h3 className="text-sm font-medium text-yellow-800 mb-2">Demo Codes</h3>
                    <div className="text-xs text-yellow-700 space-y-1">
                        <p>
                            <strong>Valid:</strong> 123456
                        </p>
                        <p>
                            <strong>Invalid:</strong> 000000
                        </p>
                        <p>
                            <strong>Expired:</strong> 111111
                        </p>
                    </div>
                </div>

                {/* Help text */}
                <div className="text-center text-xs text-gray-500">
                    <p>
                        Need help?{" "}
                        <Link to="/contact" className="text-primary hover:text-primary/80">
                            Contact support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

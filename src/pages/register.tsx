"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PasswordStrength } from "@/components/ui/password-strength"
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Loader2, Cloud } from "lucide-react"
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth"

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    })

    const watchedPassword = form.watch("password")

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            console.log("Register data:", data)
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Simulate email already exists
            if (data.email === "existing@example.com") {
                throw new Error("An account with this email already exists. Please sign in instead.")
            }

            navigate("/confirm-email", {
                state: {
                    email: data.email,
                    message: "Account created successfully! Please check your email to verify your account.",
                },
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
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
                    <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">Join millions of users who trust CloudDrive with their files</p>
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
                            {/* Name fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First name</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                                    <Input placeholder="John" className="pl-10" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                                    <Input placeholder="Doe" className="pl-10" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Email field */}
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
                                        <FormDescription>We'll send you a verification email</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password field */}
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

                            {/* Password strength indicator */}
                            {watchedPassword && <PasswordStrength password={watchedPassword} />}

                            {/* Confirm Password field */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
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

                            {/* Newsletter checkbox */}
                            <FormField
                                control={form.control}
                                name="newsletter"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-normal">Send me product updates and tips via email</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Terms checkbox */}
                            <FormField
                                control={form.control}
                                name="terms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-normal">
                                                I agree to the{" "}
                                                <Link to="/terms" className="text-primary hover:text-primary/80 font-medium">
                                                    Terms of Service
                                                </Link>{" "}
                                                and{" "}
                                                <Link to="/privacy" className="text-primary hover:text-primary/80 font-medium">
                                                    Privacy Policy
                                                </Link>
                                            </FormLabel>
                                        </div>
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
                                    Creating account...
                                </>
                            ) : (
                                "Create account"
                            )}
                        </Button>

                        {/* Sign in link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </Form>

                {/* Demo note */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-xs text-yellow-700">
                        <strong>Demo:</strong> Try "existing@example.com" to see email validation error
                    </p>
                </div>
            </div>
        </div>
    )
}

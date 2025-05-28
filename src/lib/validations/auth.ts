import {z} from "zod"

// Common validation schemas
export const emailSchema = z.string().min(1, "Email is required").email("Please enter a valid email address")

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

export const nameSchema = z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")

// Login schema
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
})

// Register schema
export const registerSchema = z
    .object({
        firstName: nameSchema,
        lastName: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Please confirm your password"),
        terms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
        newsletter: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

// Forgot password schema
export const forgotPasswordSchema = z.object({
    email: emailSchema,
})

// Reset password schema
export const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

// Change password schema
export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: passwordSchema,
        confirmPassword: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "New password must be different from current password",
        path: ["newPassword"],
    })

// Verify email schema
export const verifyEmailSchema = z.object({
    code: z
        .string()
        .min(6, "Verification code must be 6 digits")
        .max(6, "Verification code must be 6 digits")
        .regex(/^\d{6}$/, "Verification code must contain only numbers"),
})

// Export types
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>

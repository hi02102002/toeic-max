import * as z from 'zod'

export const ResetPasswordSchema = z
    .object({
        password: z
            .string({
                required_error: 'Please enter your password.',
            })
            .min(6, {
                message: 'Password must be at least 6 characters long.',
            }),
        confirmPassword: z.string({
            required_error: 'Please confirm your password.',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    })

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>

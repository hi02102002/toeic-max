import * as z from 'zod'

export const LoginSchema = z.object({
    email: z
        .string({
            required_error: 'Please enter your email address.',
        })
        .email({
            message: 'Invalid email address.',
        })
        .min(1, {
            message: 'Please enter your email address.',
        }),
    password: z
        .string({
            required_error: 'Please enter your password.',
        })
        .min(6, {
            message: 'Password must be at least 6 characters.',
        }),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

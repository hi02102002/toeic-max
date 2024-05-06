import * as z from 'zod'

export const RegisterSchema = z
    .object({
        email: z
            .string({
                message: 'Please enter email address.',
            })
            .email({
                message: 'Please enter valid email address.',
            }),
        name: z
            .string({
                required_error: 'Please enter your name.',
            })
            .min(1, {
                message: 'Please enter your name.',
            }),
        password: z
            .string({
                required_error: 'Please enter your password.',
            })
            .min(6, {
                message: 'Password must be at least 6 characters long.',
            }),
        passwordConfirm: z.string({
            required_error: 'Please confirm your password.',
        }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords do not match.',
        path: ['passwordConfirm'],
    })

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

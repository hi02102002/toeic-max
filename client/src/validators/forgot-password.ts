import * as z from 'zod'

export const ForgotPasswordSchema = z.object({
    email: z
        .string({
            message: 'Please enter email address.',
        })
        .email({
            message: 'Please enter valid email address.',
        }),
})

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>

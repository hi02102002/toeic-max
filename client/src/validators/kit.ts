import { isValidYear } from '@/utils'
import * as z from 'zod'

export const KitInputSchema = z.object({
    name: z
        .string({
            required_error: 'Please enter name.',
        })
        .min(1, {
            message: 'Please enter name.',
        }),
    year: z.coerce
        .number({
            required_error: 'Please enter year.',
        })
        .refine(
            (year) => {
                return isValidYear(year)
            },
            {
                message: 'Please enter valid year. (YYYY)',
            },
        )
        .refine(
            (year) => {
                const currentYear = new Date().getFullYear()
                return year <= currentYear && year > 1900
            },
            {
                message: 'Year must be between 1900 and current year.',
            },
        ),
})

export type KitInputSchemaType = z.infer<typeof KitInputSchema>

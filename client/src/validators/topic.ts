import * as z from 'zod'
export const InputTopicSchema = z.object({
    name: z
        .string({
            required_error: 'Please enter topic name.',
        })
        .min(1, 'Please enter topic name.'),
    parentId: z
        .string({
            required_error: 'Please select parent topic.',
        })
        .nullable()
        .optional(),
})

export type TInputTopicSchemaType = z.infer<typeof InputTopicSchema>

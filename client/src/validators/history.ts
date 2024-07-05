import { z } from 'zod'

export const HistoryInputSchema = z.object({
    meta_data: z.any(),
    type: z.enum(['test', 'practice-part', 'course', 'vocab']),
    contents: z.any(),
    user_id: z.string(),
})

export type THistoryInputSchemaType = z.infer<typeof HistoryInputSchema>

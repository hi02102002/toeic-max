import { z } from 'zod'

export const HistoryInputSchema = z.object({
    metadata: z.any(),
    type: z.enum(['test', 'practice-part', 'course', 'vocab']),
    contents: z.any(),
    userId: z.string(),
})

export type THistoryInputSchemaType = z.infer<typeof HistoryInputSchema>

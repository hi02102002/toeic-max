import * as z from 'zod'

export const VocabularySchema = z.object({
    name: z
        .string({
            required_error: 'Please enter vocabulary name.',
        })
        .min(1, 'Please enter vocabulary name.'),
    type: z
        .string({
            required_error: 'Please select vocabulary type.',
        })
        .min(1, 'Please select vocabulary type.'),
    spelling: z
        .string({
            required_error: 'Please enter vocabulary spelling.',
        })
        .min(1, 'Please enter vocabulary spelling.'),
    meaning: z
        .string({
            required_error: 'Please enter vocabulary meaning.',
        })
        .min(1, 'Please enter vocabulary meaning.'),
    topic_id: z
        .string({
            required_error: 'Please select topic.',
        })
        .min(1, 'Please select topic.'),
    category: z
        .string({
            required_error: 'Please select category.',
        })
        .min(1, 'Please select category.'),
})

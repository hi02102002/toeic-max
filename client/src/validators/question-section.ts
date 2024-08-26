import { z } from 'zod'

const PART_1_RANGE = [1, 6]
const PART_2_RANGE = [7, 31]
const PART_3_RANGE = [32, 70]
const PART_4_RANGE = [71, 100]
const PART_5_RANGE = [101, 130]
const PART_6_RANGE = [131, 146]
const PART_7_RANGE = [147, 200]
const LOCATION_PART_RANGE = {
    3: PART_3_RANGE,
    4: PART_4_RANGE,
    6: PART_6_RANGE,
    7: PART_7_RANGE,
}

const LOCATION_NOT_RANGE = {
    1: PART_1_RANGE,
    2: PART_2_RANGE,
    5: PART_5_RANGE,
}

export const QuestionSchema = z
    .object({
        p: z.coerce.number({
            required_error: 'Please choose part.',
        }),
        opts: z.object({
            a: z.string().optional(),
            b: z.string().optional(),
            c: z.string().optional(),
            d: z.string().optional(),
        }),
        ans: z.string().optional(),
        q: z.string().optional(),
        location: z.coerce
            .number({
                required_error: 'Please enter location.',
            })
            .min(1, 'Please enter location.'),
        trans: z
            .object({
                vi: z.string().optional(),
            })
            .optional(),
    })
    .superRefine((data, ctx) => {
        if ([1, 3, 5, 7].includes(data.p)) {
            if (!data.opts.a)
                ctx.addIssue({
                    path: ['opts', 'a'],
                    message: 'Please provide option a.',
                    code: 'custom',
                })
            if (!data.opts.b)
                ctx.addIssue({
                    path: ['opts', 'b'],
                    message: 'Please provide option b.',
                    code: 'custom',
                })
            if (!data.opts.c)
                ctx.addIssue({
                    path: ['opts', 'c'],
                    message: 'Please provide option c.',
                    code: 'custom',
                })
            if (!data.opts.d)
                ctx.addIssue({
                    path: ['opts', 'd'],
                    message: 'Please provide option d.',
                    code: 'custom',
                })
        } else if ([2, 4, 6].includes(data.p)) {
            if (!data.opts.a)
                ctx.addIssue({
                    path: ['opts', 'a'],
                    message: 'Please provide option a.',
                    code: 'custom',
                })
            if (!data.opts.b)
                ctx.addIssue({
                    path: ['opts', 'b'],
                    message: 'Please provide option b.',
                    code: 'custom',
                })
            if (!data.opts.c)
                ctx.addIssue({
                    path: ['opts', 'c'],
                    message: 'Please provide option c.',
                    code: 'custom',
                })
        }
    })
export const QuestionSectionSchema = z
    .object({
        part: z.coerce
            .number({
                required_error: 'Please choose part.',
            })
            .min(1, 'Please choose part.'),

        imageUrls: z.array(z.string()).optional(),
        audioUrl: z.string().optional(),
        teaser: z
            .object({
                text: z.string().optional(),
                trans: z.object({
                    vi: z.string().optional(),
                    en: z.string().optional(),
                }),
            })
            .optional(),
        location: z
            .string({
                required_error: 'Please enter location.',
            })
            .regex(
                /^(?:[1-9]\d?|1\d{2}|200)$|^(?:[1-9]\d?|1\d{2}|200)\s*-\s*(?:[1-9]\d?|1\d{2}|200)$/g,
                'Please enter valid location.',
            )
            .min(1, 'Please enter location.')
            .refine(
                (value) => {
                    if (value.includes('-')) {
                        const [start, end] = value.split('-').map(Number)

                        return start < end
                    }
                    return true
                },
                {
                    message: 'Please enter valid location.',
                },
            ),
        testKitId: z
            .string({
                required_error: 'Please choose test kit.',
            })
            .min(1, 'Please choose test kit.'),

        questions: z
            .array(QuestionSchema)
            .min(1, 'Please add at least one question.'),
    })
    .superRefine((data, ctx) => {
        data.part = Number(data.part)

        if (data.part === 1) {
            if (!data.audioUrl) {
                ctx.addIssue({
                    message: 'Audio url is required.',
                    path: ['audio_url'],
                    code: 'custom',
                })
            }

            if (!data.imageUrls?.length) {
                ctx.addIssue({
                    message: 'Image urls are required.',
                    path: ['image_urls'],
                    code: 'custom',
                })
            }
        }

        if (data.part === 2) {
            if (!data.audioUrl) {
                ctx.addIssue({
                    message: 'Audio url is required.',
                    code: 'custom',
                    path: ['audio_url'],
                })
            }
        }

        if (
            Object.keys(LOCATION_PART_RANGE).includes(String(data.part)) &&
            !data.location.includes('-')
        ) {
            const [min, max] =
                LOCATION_PART_RANGE[
                    data.part as keyof typeof LOCATION_PART_RANGE
                ]

            ctx.addIssue({
                message: `Location in part ${data.part} must be in range ${min}-${max}.`,
                code: 'custom',
                path: ['location'],
            })
        }

        if (
            Object.keys(LOCATION_PART_RANGE).includes(String(data.part)) &&
            data.location.includes('-')
        ) {
            const [start, end] = data.location.split('-').map(Number)
            const [min, max] =
                LOCATION_PART_RANGE[
                    data.part as keyof typeof LOCATION_PART_RANGE
                ]

            if (start < min || end > max) {
                ctx.addIssue({
                    message: `Location in part ${data.part} must be in range ${min}-${max}.`,
                    code: 'custom',
                    path: ['location'],
                })
            }
        }

        // Location in part 1, 5 must be a single number
        if (
            Object.keys(LOCATION_NOT_RANGE).includes(String(data.part)) &&
            data.location.includes('-')
        ) {
            ctx.addIssue({
                message: `Location in part ${data.part} must be a single number.`,
                code: 'custom',
                path: ['location'],
            })
        }

        if (
            Object.keys(LOCATION_NOT_RANGE).includes(String(data.part)) &&
            !data.location.includes('-')
        ) {
            const [min, max] =
                LOCATION_NOT_RANGE[data.part as keyof typeof LOCATION_NOT_RANGE]

            if (Number(data.location) < min || Number(data.location) > max) {
                ctx.addIssue({
                    message: `Location in part ${data.part} must be in range ${min}-${max}.`,
                    code: 'custom',
                    path: ['location'],
                })
            }
        }
    })

export type QuestionSectionSchemaType = z.infer<typeof QuestionSectionSchema>
export type QuestionSchemaType = z.infer<typeof QuestionSchema>

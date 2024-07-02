import { histories } from '@/database/schema'

export type THistory = typeof histories.$inferSelect

export type TCreateHistory = typeof histories.$inferInsert

export type TUpdateHistory = typeof histories.$inferInsert

export type TPracticePart = {
    section_question_id: string
    question_id: string
    choose: string
    ans: string
    is_correct: boolean
    part: number
}

export type TTest = {
    section_question_id: string
    question_id: string
    choose: string
    ans: string
    is_correct: boolean
    part: number
}

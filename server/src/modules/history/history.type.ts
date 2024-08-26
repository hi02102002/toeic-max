import { histories } from '@/database/schema'

export type THistory = typeof histories.$inferSelect

export type TCreateHistory = typeof histories.$inferInsert

export type TUpdateHistory = typeof histories.$inferInsert

export type TPracticePart = {
    sectionQuestionId: string
    questionId: string
    choose: string
    ans: string
    isCorrect: boolean
    part: number
}

export type TTest = {
    sectionQuestionId: string
    questionId: string
    choose: string
    ans: string
    isCorrect: boolean
    part: number
}

import { question_sections, questions } from '@/database/schema'

export type TQuestionSection = typeof question_sections.$inferSelect

export type TQuestion = typeof questions.$inferSelect

export type TQuestionSectionWithQuestion = TQuestionSection & {
    questions: TQuestion[]
}

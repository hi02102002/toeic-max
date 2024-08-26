import { vocabularies } from '@/database/schema'

export type TVocabulary = typeof vocabularies.$inferSelect

export enum ELearnType {
    VOCA = 'voca',
    TRUE_OR_FALSE = 'true_or_false',
    FILL_BLANK = 'fill_blank',
    CHOOSE_WORD = 'choose_word',
    CHOOSE_MEANING = 'choose_meaning',
    // FLASHCARD = 'flashcard',
}

export type TLearnVoca = TVocabulary & {
    percent: number
    learned: Array<ELearnType>
    learning: Array<ELearnType>
    needLearnAgain: Array<ELearnType>
    vocabId: string
}

import type { TSelectResponse } from '@/types/common'

export const ROUTES = {
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        FORGOT_PASSWORD: '/forgot-password',
        RESET_PASSWORD: '/reset-password',
        INDEX: '/auth',
    },
}

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        CURRENT_USER: '/auth/current-user',
        LOGOUT: '/auth/logout',
    },
    BASE_CRUD: {
        FOR_SELECT: '/for-select',
        ALL: '/all',
    },
    KITS: {
        INDEX: '/kits',
        ALL: '/kits/all',
        FOR_SELECT: '/kits/for-select',
    },
    KIT_TESTS: {
        INDEX: '/kit-tests',
        ALL: '/kit-tests/all',
        FOR_SELECT: '/kit-tests/for-select',
    },
    QUESTIONS: {
        INDEX: '/questions',
        ALL: '/questions/all',
    },
    UPLOAD: {
        IMAGE: '/upload/image',
        AUDIO: '/upload/audio',
    },
    TOPICS: {
        INDEX: '/topics',
        ALL: '/topics/all',
    },
    VOCABULARIES: {
        INDEX: '/vocabularies',
        ALL: '/vocabularies/all',
    },
    SECTIONS: {
        INDEX: '/sections',
        ALL: '/sections/all',
    },
    HISTORY: {
        INDEX: '/histories',
        ALL: '/histories/all',
        CREATE_FOR_VOCAB: '/histories/create-for-vocab',
    },
    RESULT: {
        INDEX: '/results',
        PRACTICE_PART: (historyId: string, type: string) =>
            `/results/practice-part/${historyId}?type=${type}`,
        VOCAB: (historyId: string) => `/results/vocab/${historyId}`,
    },
} as const

export const ERROR_MESSAGE =
    'Something went wrong while requesting the server. Please try again later.'

export const NOT_CHOOSE = 'NOT_CHOOSE'

export const PARTS: TSelectResponse[] = [1, 2, 3, 4, 5, 6, 7].map((part) => ({
    value: `${part}`,
    label: `Part ${part}`,
}))

export const QUESTION_TYPES: TSelectResponse[] = []

export const VOCABULARY_TYPES: TSelectResponse[] = [
    'Noun',
    'Verb',
    'Adjective',
    'Adverb',
    'Preposition',
    'Conjunction',
    'Interjection',
].map((type) => ({
    value: type.toLowerCase(),
    label: type,
}))

export const VOCABULARY_CATEGORY: TSelectResponse[] = [
    'Verb - Động từ',
    'Noun - Danh từ',
    'Adjective - Tính từ',
    'Adverb - Trạng từ',
    'Preposition - Giới từ',
    'Conjunction - Liên từ',
    'Interjection - Thán từ',
].map((category) => ({
    value: category,
    label: category,
}))

/**
 * The maximum time for a test in seconds.
 */
export const MAX_TIME_TEST = 120 * 60 // 120 minutes

/**
 * Not render question text for these parts.
 */
export const PARTS_NOT_RENDER_QUESTION_TEXT = [1, 2]

/**
 * Not render options for these parts.
 */
export const PARTS_NOT_RENDER_OPTS_VAL = [1, 2, 3]

/**
 * Render only 3 options for these parts.
 */
export const PARTS_RENDER_ONLY_3_OPTS = [2]

/**
 * Render teaser for these parts.
 */
export const PART_RENDER_TEASER = [6, 7]

export const READING_PARTS = [5, 6, 7]
export const LISTENING_PARTS = [1, 2, 3, 4]
export const MAX_SCORE = 495

export const ALPHABETS = new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(65 + i).toLowerCase())

export const MAX_VOCA_PER_LEARN = 4

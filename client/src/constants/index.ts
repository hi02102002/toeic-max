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
}

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

export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 32
export const MAX_ID_LENGTH = 36
export const TIME_EXPIRED_REFRESH_TOKEN = 60 * 60 * 24 * 7 // 7 days
export const TIME_EXPIRED_RESET_PASSWORD_TOKEN = 60 * 60 * 2 // 2 hours
export const TIME_EXPIRED_ACCESS_TOKEN = 60

export const LOGGER_SECTION = {
    SEED: '[SEED]',
    AUTH_SERVICE: '[AUTH_SERVICE]',
    USER_SERVICE: '[USER_SERVICE]',
    USER_CONTROLLER: '[USER_CONTROLLER]',
    AUTH_CONTROLLER: '[AUTH_CONTROLLER]',
    KIT_SERVICE: '[KIT_SERVICE]',
    KIT_CONTROLLER: '[KIT_CONTROLLER]',
    KIT_TEST_SERVICE: '[KIT_TEST_SERVICE]',
    KIT_TEST_CONTROLLER: '[KIT_TEST_CONTROLLER]',
    QUESTION_SERVICE: '[QUESTION_SERVICE]',
    QUESTION_CONTROLLER: '[QUESTION_CONTROLLER]',
    RESULT_SERVICE: '[RESULT_SERVICE]',
    RESULT_CONTROLLER: '[RESULT_CONTROLLER]',
}

export const REDIS_KEYS = {
    RESULT: (userId: string, historyId: string) =>
        `RESULT:${userId}:${historyId}`,
    TEST_QUESTIONS: (testId: string) => `TEST-${testId}`,
} as const

export const SPLIT_SECTION = {
    '7': '7',
    '32-34': '32-34',
    '71-73': '71-73',
    '101': '101',
    '131-134': '131-134',
    '147-148': '147-148',
}

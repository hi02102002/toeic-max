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
}

export const ERROR_MESSAGE =
    'Something went wrong while requesting the server. Please try again later.'

export const NOT_CHOOSE = 'NOT_CHOOSE'

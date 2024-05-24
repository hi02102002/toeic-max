const globals = require('globals')

module.exports = {
    globals: { ...globals.browser, ...globals.node },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    rules: {
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],
        'vue/first-attribute-linebreak': 'off',
        'vue/return-in-emits-validator': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        vueFeatures: {
            filter: true,
            interpolationAsNonHTML: false,
        },
        parser: '@typescript-eslint/parser',
    },
}

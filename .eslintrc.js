module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            alias: {
                map: [['@', './alias.config.js']],
            },
        },
    },
    plugins: ['@typescript-eslint', 'react', 'import', 'simple-import-sort'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'import/no-unresolved': 'off',
        quotes: ['error', 'single', { avoidEscape: true }],
        'jsx-quotes': ['error', 'prefer-double'],
        semi: ['error', 'always'],
        indent: ['error', 4],
        'no-unused-vars': 'warn',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/order': 'off',
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
};

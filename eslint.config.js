import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
    eslint.configs.recommended,
    {
        files: ['**/*.{js,ts,jsx,tsx}'],
        languageOptions: {
            parser: parser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
            }
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            // Strict indentation and whitespace rules
            'indent': ['error', 4, {
                'SwitchCase': 1,
                'VariableDeclarator': 1,
                'outerIIFEBody': 1,
                'MemberExpression': 1,
                'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
                'FunctionExpression': { 'parameters': 1, 'body': 1 },
                'CallExpression': { 'arguments': 1 },
                'ArrayExpression': 1,
                'ObjectExpression': 1,
                'ImportDeclaration': 1,
                'flatTernaryExpressions': false,
                'ignoreComments': false
            }],
            'no-mixed-spaces-and-tabs': 'error',
            'no-trailing-spaces': 'error',
            'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1, 'maxBOF': 0 }],
            'eol-last': ['error', 'always'],
            'space-before-blocks': 'error',
            'space-infix-ops': 'error',
            'space-unary-ops': 'error',
            'space-before-function-paren': ['error', {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always'
            }],
            'keyword-spacing': 'error',
            'comma-spacing': ['error', { 'before': false, 'after': true }],
            'array-bracket-spacing': ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'semi-spacing': ['error', { 'before': false, 'after': true }],
            'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
            'block-spacing': 'error',
            'computed-property-spacing': ['error', 'never'],

            // Line break rules
            'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
            'newline-before-return': 'error',
            'padding-line-between-statements': [
                'error',
                { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*' },
                { 'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var'] }
            ],

            // Semicolons and quotes
            'semi': ['error', 'always'],
            'quotes': ['error', 'double', { 'allowTemplateLiterals': true }],

            // General code quality
            'no-console': 'off',
            'prefer-const': 'error',
            'no-var': 'error',
            'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],

            // Disable some rules that conflict with TypeScript
            'no-undef': 'off',
        }
    },
    {
        ignores: [
            'node_modules/',
            'dist/',
            'build/',
            'java/',
            'playwright-report/',
            'test-results/',
            '*.config.js',
            '*.config.ts',
            'vite.config.ts',
            'playwright.config.ts'
        ]
    }
];
const js = require('@eslint/js');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');

module.exports = [
    {
        ignores: [
            'node_modules/**',
            'vendor/**',
            'public/**',
            'var/**',
            '**/*.min.js',
        ],
    },
    {
        files: ['assets/**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: __dirname,
                sourceType: 'module',
                ecmaVersion: 2022,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                $: 'readonly',
                jQuery: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            import: importPlugin,
        },
        settings: {
            'import/resolver': {
                typescript: { project: ['./tsconfig.json'] },
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tsPlugin.configs['recommended-type-checked'].rules,
            ...tsPlugin.configs['stylistic-type-checked'].rules,
            'max-len': ['warn', { code: 120, ignoreComments: true, ignoreStrings: true }],
            'no-promise-executor-return': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            'import/extensions': ['error', 'ignorePackages', {
                js: 'always',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            }],
        },
    },
    {
        files: ['assets/**/*.js'],
        languageOptions: {
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2022,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                $: 'readonly',
                jQuery: 'readonly',
            },
        },
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            'max-len': ['warn', { code: 120, ignoreComments: true, ignoreStrings: true }],
            'no-promise-executor-return': 'off',
            'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
        },
    },
];

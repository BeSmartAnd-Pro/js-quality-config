const fs = require('node:fs');
const path = require('node:path');

const js = require('@eslint/js');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');

const projectRootDir = process.cwd();
const tsconfigPath = path.join(projectRootDir, 'tsconfig.json');
const hasTsconfig = fs.existsSync(tsconfigPath);

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
            parserOptions: hasTsconfig
                ? {
                    project: ['./tsconfig.json'],
                    tsconfigRootDir: projectRootDir,
                    sourceType: 'module',
                    ecmaVersion: 2022,
                }
                : {
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
        settings: hasTsconfig
            ? {
                'import/resolver': {
                    typescript: {
                        project: ['./tsconfig.json'],
                    },
                },
            }
            : undefined,
        rules: {
            ...js.configs.recommended.rules,
            ...(hasTsconfig
                ? {
                    ...tsPlugin.configs['recommended-type-checked'].rules,
                    ...tsPlugin.configs['stylistic-type-checked'].rules,
                }
                : {
                    ...tsPlugin.configs.recommended.rules,
                }),
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

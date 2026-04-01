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
const sharedGlobals = {
    ...globals.browser,
    ...globals.node,
    $: 'readonly',
    jQuery: 'readonly',
};
const sharedRules = {
    ...js.configs.recommended.rules,
    'max-len': ['warn', { code: 120, ignoreComments: true, ignoreStrings: true }],
    'no-promise-executor-return': 'off',
};

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
                    projectService: true,
                    tsconfigRootDir: projectRootDir,
                    sourceType: 'module',
                    ecmaVersion: 'latest',
                }
                : {
                    sourceType: 'module',
                    ecmaVersion: 'latest',
                },
            globals: sharedGlobals,
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            import: importPlugin,
        },
        ...(hasTsconfig
            ? {
                settings: {
                    'import/resolver': {
                        typescript: {
                            project: ['./tsconfig.json'],
                        },
                    },
                },
            }
            : {}),
        rules: {
            ...sharedRules,
            ...(hasTsconfig
                ? {
                    ...tsPlugin.configs['recommended-type-checked'].rules,
                    ...tsPlugin.configs['stylistic-type-checked'].rules,
                }
                : {
                    ...tsPlugin.configs.recommended.rules,
                }),
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
                ecmaVersion: 'latest',
            },
            globals: sharedGlobals,
        },
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...sharedRules,
            'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
        },
    },
];

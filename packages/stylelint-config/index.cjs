/** @type {import('stylelint').Config} */
module.exports = {
    extends: ['stylelint-config-recommended-scss'],
    plugins: [
        'stylelint-scss',
        'stylelint-declaration-strict-value',
        'stylelint-prettier',
        'stylelint-order',
    ],
    rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'function-no-unknown': null,
        'scss/function-no-unknown': true,
        'scss/no-global-function-names': null,
        'scale-unlimited/declaration-strict-value': [
            ['color', 'fill', 'font-family', 'z-index'],
            { ignoreValues: ['transparent', 'inherit', /rgba(.*)/] },
        ],
        'selector-class-pattern': '[a-zA-Z0-9]+',
        'declaration-block-no-duplicate-properties': [
            true,
            { ignore: ['consecutive-duplicates-with-different-values'] },
        ],
        'max-nesting-depth': 3,
        'order/order': ['custom-properties', 'declarations'],
        'order/properties-alphabetical-order': true,
        'no-descending-specificity': true,
        'no-duplicate-at-import-rules': true,
        'no-duplicate-selectors': true,
        'rule-empty-line-before': [
            'always-multi-line',
            { except: ['first-nested'], ignore: ['after-comment'] },
        ],
        'prettier/prettier': true,
    },
};

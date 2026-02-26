/** @type {import('stylelint').Config} */
module.exports = {
    extends: ["stylelint-config-recommended-scss"],
    plugins: ["stylelint-order", "stylelint-prettier", "stylelint-scss"],
    rules: {
        /**
         * SCSS support
         */
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": true,

        "function-no-unknown": null,
        "scss/function-no-unknown": true,

        "scss/no-global-function-names": null,

        /**
         * Formatting via Prettier
         */
        "prettier/prettier": true,

        /**
         * Readability / maintainability
         */
        "max-nesting-depth": 3,

        "declaration-block-no-duplicate-properties": [
            true,
            { ignore: ["consecutive-duplicates-with-different-values"] },
        ],

        "no-descending-specificity": null,
        "no-duplicate-at-import-rules": true,
        "no-duplicate-selectors": true,

        "rule-empty-line-before": [
            "always-multi-line",
            { except: ["first-nested"], ignore: ["after-comment"] },
        ],

        /**
         * Property ordering
         */
        "order/order": ["custom-properties", "declarations"],
        "order/properties-alphabetical-order": true,

        /**
         * Selector conventions – allow kebab-case, BEM, js-/is-/has- hooks
         */
        "selector-class-pattern": [
            "^(?:[a-z][a-z0-9-]*)(?:__(?:[a-z0-9-]+))?(?:--(?:[a-z0-9-]+))?$|^(?:js|is|has)-[a-z0-9-]+$",
            {
                message:
                    "Use kebab-case/BEM (block__element--modifier) or js-/is-/has- prefixes.",
            },
        ],

        /**
         * Hex style (this one clearly works for you, bo dostajesz błąd z color-hex-length)
         */
        "color-hex-length": "short",

        /**
         * Vendor prefixes – usually handled by autoprefixer in modern setups
         */
        "property-no-vendor-prefix": true,
        "value-no-vendor-prefix": true,
    },
};

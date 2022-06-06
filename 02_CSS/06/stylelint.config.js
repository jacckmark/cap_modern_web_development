"use strict";

module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-sass-guidelines",
    "stylelint-config-prettier",
  ],
  rules: {
    "order/properties-alphabetical-order": true,
    "function-no-unknown": [
      true, {
        ignoreFunctions: ["/^map./", "/^math./"]
      }
    ],
    "unit-disallowed-list": [
      ["cm", "mm", "in", "px", "pt", "pc", "em"],
      {
        ignoreMediaFeatureNames: {
          px: ["min-width", "max-width", "min-height", "max-height"],
        },
      },
    ],

    // Change default nesting depth from 3 to 4 with an exception for pseudo-classes (`::before` and `::after`)
    "max-nesting-depth": [
      4,
      {
        ignore: ["pseudo-classes"],
      },
    ],
    // disable rule for the project's icon font
    "font-family-no-missing-generic-family-keyword": true,
    "property-no-vendor-prefix": [
      true,
      {
        // disabled for `-webkit-appearance` to allow browser independent styling of inputs, buttons and other form elements
        // disabled for `-webkit-box-orient` to allow box-flex display: https://developer.mozilla.org/en-US/docs/Web/CSS/box-flex
        ignoreProperties: ["appearance", "box-orient"],
      },
    ],

    "selector-no-vendor-prefix": [
      true,
      {
        // disabled for `-webkit-input-placeholder` to allow styling input placeholders
        ignoreSelectors: ["::-webkit-input-placeholder"],
      },
    ],
    "value-no-vendor-prefix": [
      true,
      {
        // disabled for `-webkit-box` to allow box-flex display: https://developer.mozilla.org/en-US/docs/Web/CSS/box-flex
        ignoreValues: ["box"],
      },
    ],
    // regex has been added to allow using the [BEM convention](https://seesparkbox.com/foundry/bem_by_example)
    "selector-class-pattern":
      "([a-z]+)*(?:__[a-z]+(?:-[a-z]+)*)?(?:--[a-z]+(?:-[a-z]+)*)?(?:\\[.+\\])?",
    "scss/percent-placeholder-pattern":
      "([a-z]+)*(?:__[a-z]+(?:-[a-z]+)*)?(?:--[a-z]+(?:-[a-z]+)*)?(?:\\[.+\\])?",
    "selector-no-qualifying-type": [
      true,
      {
        ignore: ["attribute", "class"],
      },
    ],

    // disable limitation of .dot placeholders to support `@extend .class-name`
    "scss/at-extend-no-missing-placeholder": null,

    // default compound selectors depth from 3 to 4
    "selector-max-compound-selectors": 4,
    "selector-type-no-unknown": true,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["vertical", "horizontal"],
      },
    ],
  },
  "no-invalid-position-at-import-rule": null,
};

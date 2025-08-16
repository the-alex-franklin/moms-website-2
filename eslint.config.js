// eslint.config.js
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * Utility to convert all rule severities to "warn" except for actual error rules.
 */
function warnEverything(rules) {
  const result = {};
  for (const [rule, setting] of Object.entries(rules)) {
    if (typeof setting === "string") {
      result[rule] = setting === "off" ? "off" : "warn";
    } else if (Array.isArray(setting)) {
      result[rule] =
        setting[0] === "off" ? "off" : ["warn", ...setting.slice(1)];
    } else {
      result[rule] = "warn";
    }
  }

  return result;
}

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // Start with the recommended rules as warn
      ...warnEverything(js.configs.recommended.rules),
      ...warnEverything(reactPlugin.configs.recommended.rules),
      ...warnEverything(hooksPlugin.configs.recommended.rules),

      // Syntax rules
      semi: ["warn", "always"],
      eqeqeq: ["warn", "smart"],
      "no-extra-semi": "warn",
      "jsx-quotes": "warn",
      "prefer-const": ["warn", { destructuring: "all" }],
      "comma-dangle": ["warn", "always-multiline"],
      "padded-blocks": ["warn", "never"],
      "space-before-blocks": ["warn", "always"],
      "no-constant-condition": "warn",
      "no-unreachable": "warn",
      "no-unused-labels": "off",
      "no-undef": "off",
      "no-redeclare": "off",

      // Indentation
      indent: [
        "warn",
        2,
        {
          SwitchCase: 1,
          ignoredNodes: ["TemplateLiteral *"],
        },
      ],

      // Unused variables
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Whitespace
      "no-trailing-spaces": "warn",
      "object-curly-spacing": ["warn", "always"],

      // Empty blocks and functions
      "no-empty": "warn",
      "no-empty-function": ["warn", { allow: ["constructors"] }],

      // Line spacing
      "eol-last": ["warn", "always"],
      "no-multiple-empty-lines": [
        "warn",
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "any", prev: "block", next: "return" },
        { blankLine: "any", prev: "empty", next: "return" },
      ],

      // TypeScript specific
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",

      // Console and debugging
      "no-console": ["warn", { allow: ["info", "warn", "error"] }],

      // React rules
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

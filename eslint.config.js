// eslint.config.js
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * Utility to convert all rule severities to "warn" except for actual error rules.
 */
function warnEverything(rules) {
  const result = {};
  for (const [rule, setting] of Object.entries(rules)) {
    if (typeof setting === "string") {
      result[rule] = setting === "off" ? "off" : "warn";
    } else if (Array.isArray(setting)) {
      result[rule] = setting[0] === "off" ? "off" : ["warn", ...setting.slice(1)];
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
    },
    rules: {
      // Start with the recommended rules as warn
      ...warnEverything(js.configs.recommended.rules),
      ...warnEverything(reactPlugin.configs.recommended.rules),
      ...warnEverything(hooksPlugin.configs.recommended.rules),

      // Then force actual code-breaking stuff to "error"
      "no-undef": "error", // Using undeclared variables
      "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
      "no-unreachable": "error",
      "no-dupe-keys": "error",
      "no-func-assign": "error",
      "no-import-assign": "error",
      "no-const-assign": "error",
      "no-class-assign": "error",
      "constructor-super": "error",
      "valid-typeof": "error",
      "react/jsx-no-undef": "error",
      "react-hooks/rules-of-hooks": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

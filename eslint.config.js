// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
    // Base JS rules
    js.configs.recommended,

    // TypeScript (type-aware)
    ...tseslint.configs.recommendedTypeChecked,

    {
        files: ["**/*.{js,ts,jsx,tsx}"],

        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            parserOptions: {
                projectService: {
                    // MUST be narrow – no **
                    allowDefaultProject: [
                        "tests/*.spec.ts",
                        "tests/*.spec.tsx",
                        "playwright.config.ts",
                    ],
                },
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },

        plugins: {
            react,
            "react-hooks": reactHooks,
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            // React
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "react/prop-types": "off",

            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            // TypeScript
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/consistent-type-imports": "error",

            // General
            "no-console": "off",
            "prefer-const": "error",
            "no-var": "error",
        },
    },

    // Playwright test-specific overrides
    {
        files: ["tests/*.spec.ts", "tests/*.spec.tsx"],
        rules: {
            "@typescript-eslint/no-floating-promises": "off",
        },
    },

    // Ignore outputs and configs
    {
        ignores: [
            "node_modules/",
            "dist/",
            "build/",
            "java/",
            "playwright-report/",
            "test-results/",
            "*.config.js",
            "*.config.ts",
            "vite.config.ts",
            "playwright.config.ts",
        ],
    },
];

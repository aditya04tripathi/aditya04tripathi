import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import svelte from 'eslint-plugin-svelte';
import * as astroParser from 'astro-eslint-parser';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist/**', 'build/**', 'node_modules/**', 'public/**'],
    },
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
        extends: [tseslint.configs.recommended],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    ...astro.configs.recommended,
    {
        files: ['**/*.astro'],
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.astro'],
            },
        },
    },
    ...svelte.configs.recommended,
    {
        files: ['**/*.svelte', '**/*.svelte.js', '**/*.svelte.ts'],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.svelte'],
            },
        },
        rules: {
            'svelte/no-useless-mustaches': 'off',
        },
    },
    {
        files: ['**/*.{jsx,tsx}'],
        ...react.configs.flat.recommended,
    },
    {
        files: ['**/*.{jsx,tsx}'],
        ...react.configs.flat['jsx-runtime'],
    },
    {
        files: ['**/*.{jsx,tsx}'],
        ...reactHooks.configs.flat.recommended,
    },
    {
        files: ['**/*.{jsx,tsx}'],
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
);

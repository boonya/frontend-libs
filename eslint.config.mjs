import {defineConfig} from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import prettier from 'eslint-config-prettier/flat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import security from 'eslint-plugin-security';
import ts from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';

const files = {
  json: ['**/*.json'],
  jsTs: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  react: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
  tsOnly: ['**/*.{ts,tsx,mts,cts}'],
};

const tsConfig = ts.config(
  ts.configs.recommended,
  [
    {
      files: files.tsOnly,
      ...ts.configs.recommendedTypeChecked[2],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  ],
  [
    {
      files: files.tsOnly,
      ...ts.configs.stylisticTypeChecked[2],
    },
  ],
);

export default defineConfig([
  // Global ignore definition
  {ignores: ['**/build/', 'coverage/', '**/node_modules/', 'storybook-static/', '__.*']},
  // General js definitions
  {files: files.jsTs, plugins: {js}, extends: ['js/recommended']},
  {files: files.jsTs, languageOptions: {globals: globals.browser}},
  // Other useful definitions
  {
    files: files.jsTs,
    ...security.configs.recommended,
  },
  {
    files: files.jsTs,
    ...unicorn.configs.recommended,
    rules: {
      ...unicorn.configs.recommended.rules,
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  // lint JSON files
  {
    files: files.json,
    ignores: ['package-lock.json'],
    plugins: {json},
    language: 'json/json',
    extends: ['json/recommended'],
  },
  // lint JSONC files
  {files: ['**/*.jsonc', '.vscode/*.json'], plugins: {json}, language: 'json/jsonc', extends: ['json/recommended']},
  // lint markdown files
  {files: ['**/*.md'], plugins: {markdown}, language: 'markdown/commonmark', extends: ['markdown/recommended']},
  // lint typescript files
  tsConfig,
  // lint react
  {
    files: files.react,
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    ...reactHooks.configs.recommended,
  },
  {
    files: files.react,
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  // Overrides and custom rulesets
  prettier,
  {
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      'sort-imports': 'error',
      // 'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      // 'filenames/match-exported': 'error',
      // 'import/no-deprecated': 'warn',
    },
  },
]);

import * as reactHooks from 'eslint-plugin-react-hooks';
import {defineConfig} from 'eslint/config';
import globals from 'globals';
import importX from 'eslint-plugin-import-x';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import prettier from 'eslint-config-prettier/flat';
import react from 'eslint-plugin-react';
import security from 'eslint-plugin-security';
import ts from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import unicorn from 'eslint-plugin-unicorn';

const files = {
  json: ['**/*.json'],
  jsTs: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  react: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
  tsOnly: ['**/*.{ts,tsx,mts,cts}'],
};

const tsConfig = ts.config(
  // eslint-disable-next-line import-x/no-named-as-default-member
  ts.configs.recommended,
  [
    {
      files: files.tsOnly,
      // eslint-disable-next-line import-x/no-named-as-default-member
      ...ts.configs.strictTypeChecked[2],
      // eslint-disable-next-line import-x/no-named-as-default-member
      ...ts.configs.stylisticTypeChecked[2],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  ],
);

const importXConfig = [
  // eslint-disable-next-line import-x/no-named-as-default-member
  importX.flatConfigs.recommended,
  // eslint-disable-next-line import-x/no-named-as-default-member
  importX.flatConfigs.typescript,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // 'import-x/no-dynamic-require': 'warn',
      // 'import-x/no-nodejs-modules': 'warn',
      'import-x/no-deprecated': 'warn',
    },
  },
];

const reactConfig = [
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
];

const securityConfig = {
  files: files.jsTs,
  ...security.configs.recommended,
};

const unicornConfig = {
  files: files.jsTs,
  ...unicorn.configs.recommended,
  rules: {
    ...unicorn.configs.recommended.rules,
    'unicorn/prevent-abbreviations': 'off',
  },
};

const jsonConfig = [
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
];

const markdownConfig = [
  {files: ['**/*.md'], plugins: {markdown}, language: 'markdown/commonmark', extends: ['markdown/recommended']},
];

export default defineConfig([
  // Global ignore definition
  {ignores: ['**/build/', 'coverage/', '**/node_modules/', 'storybook-static/', '__.*']},
  // General js definitions
  {files: files.jsTs, plugins: {js}, extends: ['js/recommended']},
  {files: files.jsTs, languageOptions: {globals: globals.browser}},
  // Other useful definitions
  importXConfig,
  securityConfig,
  unicornConfig,
  jsonConfig,
  markdownConfig,
  tsConfig,
  reactConfig,
  // Overrides and custom rulesets
  prettier,
  {
    rules: {
      'no-console': 'error',
      'no-alert': 'error',
      'no-debugger': 'error',
      'no-warning-comments': ['warn', {terms: ['TODO', 'FIXME', 'to do'], location: 'anywhere'}],
      'sort-imports': 'error',
      // 'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      // 'filenames/match-exported': 'error',
      // 'import/no-deprecated': 'warn',
    },
  },
]);

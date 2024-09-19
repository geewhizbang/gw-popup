import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,vue}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
    env: {
      browser: true,
      es2020: true,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      vue: vuePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...vuePlugin.configs['vue3-essential'].rules,
      ...prettierPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'vue/no-unused-vars': [
        'error',
        {
          ignorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      eqeqeq: ['error', 'always'],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          tabWidth: 2,
          useTabs: false,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'vue/no-parsing-error': [
        'error',
        {
          'x-invalid-end-tag': false,
          'invalid-first-character-of-tag-name': false,
        },
      ],
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
      },
    },
  },
  {
    files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
    ...vuePlugin.configs['cypress/recommended'],
  },
];

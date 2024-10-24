import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import _import from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const config = [
  ...fixupConfigRules(
    compat.extends(
      'next/core-web-vitals',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:import/recommended',
      'plugin:@typescript-eslint/recommended',
    ),
  ),
  {
    plugins: {
      import: fixupPluginRules(_import),
      react: fixupPluginRules(react),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },
    ignores: ['node_modules', '.next', 'out', 'public', 'dist', 'build'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
        },
      },
    },

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['.*'],

          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message: "'import React from 'react''는 사용하지 않습니다.",
            },
          ],
        },
      ],

      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          allowSeparatedGroups: true,
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
            'unknown',
          ],

          pathGroups: [
            {
              pattern: 'next',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'react',
              group: 'builtin',
            },
            {
              pattern: '@tanstack/**',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/libs/**',
              group: 'unknown',
            },
            {
              pattern: '@/core/**',
              group: 'unknown',
            },
            {
              pattern: '@/store/**',
              group: 'unknown',
            },
            {
              pattern: '**/*.css.ts',
              group: 'unknown',
              position: 'after',
            },
          ],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/extensions': ['error', 'ignorePackages'],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'import/prefer-default-export': 'off',
      'react/require-default-props': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      'no-alert': 'warn',
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
  },
]

export default config

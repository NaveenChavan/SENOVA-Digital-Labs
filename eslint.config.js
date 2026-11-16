import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'scripts']),
  {
    files: ['public/firebase-messaging-sw.js', 'public/OneSignalSDKWorker.js'],
    languageOptions: {
      globals: { ...globals.serviceworker, importScripts: 'readonly', firebase: 'readonly' },
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['public/firebase-messaging-sw.js', 'public/OneSignalSDKWorker.js'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // No react/jsx-uses-vars plugin here, so JSX-only identifiers (<Icon />,
      // <motion.div>) look unused. Allow capitalised names and `motion`.
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^([A-Z_]|motion$)', argsIgnorePattern: '^[A-Z_]' },
      ],
    },
  },
])

const pluginTs = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const globals = require('globals');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': pluginTs,
    },
    rules: {
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }], // Enforce 'const' over 'let' where applicable
      'no-console': 'warn', // Warn when 'console' is used
      'no-var': 'warn', // Enforce the use of 'let' or 'const', disallow 'var'
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
];

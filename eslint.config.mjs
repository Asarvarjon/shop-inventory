// eslint.config.mjs or eslint.config.js
// @ts-check

import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**'],
  },

  // ESLint base rules
  eslint.configs.recommended,

  // Type-aware rules
  ...tseslint.configs.recommendedTypeChecked,

  // Prettier integration
  eslintPluginPrettierRecommended,

  // Language + parser settings
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.json'], // ✅ Enables full type-checking
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
    },
  },

  // Custom rule overrides
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // allow `any` for flexibility
      '@typescript-eslint/no-floating-promises': 'warn', // good for async safety
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn', // ✅ ENABLED safely now
      '@typescript-eslint/no-unsafe-member-access': 'warn',
    },
  },
);

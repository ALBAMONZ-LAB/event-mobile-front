// eslint.config.js
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/', 'dist/'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        console: true,
        window: true,
        document: true,
        process: true,
        __dirname: true,
      },
      env: {
        browser: true,
      },
    },

    plugins: {
      '@typescript-eslint': ts,
    },

    rules: {
      ...ts.configs.recommended.rules, // TS 기본 룰
      ...prettier.rules, // Prettier와 충돌 제거
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 사용하지 않는 변수 경고 (단, `_`로 시작하는 인자는 허용)
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

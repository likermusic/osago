const path = require('path');

module.exports = {
  extends: [
    path.resolve(__dirname, './rules/publicApi'),
    path.resolve(__dirname, './rules/layersSlices'),
    path.resolve(__dirname, './rules/importOrder'),
    path.resolve(__dirname, './rules/commonRules'),
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2015',
    sourceType: 'module',
    project: [path.resolve(__dirname, '../../tsconfig.json')],
  },
  plugins: ['@feature-sliced/eslint-plugin-messages'],
  processor: '@feature-sliced/messages/fs',
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        directory: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

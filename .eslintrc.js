module.exports = {
  extends: [
    './node_modules/@sravni/linters/eslint/base',
    './node_modules/@sravni/linters/eslint/react',
    './config/eslint',
    'plugin:storybook/recommended',
  ],
  rules: {
    'no-console': ['error'],
    'import/no-duplicates': ['error', { considerQueryString: true }],
  },
};

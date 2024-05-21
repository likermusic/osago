module.exports = {
  rules: {
    'no-nested-ternary': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase', 'UPPER_CASE'],
        prefix: ['is', 'has', 'should', 'IS_', 'HAS_', 'SHOULD_'],
      },
    ],

    'react/jsx-handler-names': 0,
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    '@typescript-eslint/no-invalid-void-type': 0,
    // TODO: переезжаем на error когда пофиксим все warn https://sravni-corp.atlassian.net/browse/OS-6733
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 0,
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.stories.tsx'],
      rules: { '@typescript-eslint/no-empty-function': 0 },
    },
    {
      files: ['*.spec.ts'],
      rules: { 'max-nested-callbacks': 0, '@typescript-eslint/ban-ts-comment': 0 },
    },
  ],
};

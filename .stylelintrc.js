module.exports = {
  extends: ['./node_modules/@sravni/linters/stylelint/scss'],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]+$',
      {
        message: 'Expected class selector to be camelCase',
      },
    ],
    'custom-property-pattern': null,
    'media-feature-name-disallowed-list': [
      'max-width',
      {
        message: 'Use min-width for a media-query (media-feature-name-disallowed-list)',
      },
    ],
  },
};

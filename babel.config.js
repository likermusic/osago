const moduleResolverPlugin = [
  'module-resolver',
  {
    root: ['./'],
    extensions: ['.ts', '.tsx'],
  },
];

module.exports = (api) => {
  api.cache(true);

  return {
    presets: ['next/babel'],
    env: {
      test: {
        plugins: [moduleResolverPlugin],
      },
    },
  };
};

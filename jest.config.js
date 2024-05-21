const { join } = require('path');
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  preset: 'ts-jest',
  testRegex: '\\.spec.(js|ts|tsx)$',
  testPathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./scripts/setupTests.ts'],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: join('<rootDir>', compilerOptions.baseUrl)
    }),
    '\\.(css|less|scss)$': '<rootDir>/scripts/styleMock.js',
    '^.+\\.svg$': '<rootDir>/scripts/styleMock.js',
    "jose": require.resolve('jose'),
  }
};

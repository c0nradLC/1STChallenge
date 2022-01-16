/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@1STChallenge/(.*)": "<rootDir>/src/$1"
  },
  testSequencer: "<rootDir>/src/utils/tests/testSequencer.js",
  testTimeout: 30000,
  globals: {
    'ts-jest': {
        isolatedModules: true
    }
  },
  globalSetup: "<rootDir>/src/utils/tests/jestGlobalSetup.js"
};
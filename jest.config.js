/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@1STChallenge/(.*)": "<rootDir>/src/$1"
  },
  testSequencer: "./src/utils/tests/testSequencer.js",
  testTimeout: 30000,
  globals: {
    'ts-jest': {
        isolatedModules: true
    }
  },
};
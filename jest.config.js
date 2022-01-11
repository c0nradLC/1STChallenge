/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@1STChallenge/(.*)": "<rootDir>/src/$1"
  },
  testSequencer: "./src/utils/tests/testSequencer.js"
};
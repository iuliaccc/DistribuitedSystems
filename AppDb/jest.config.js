/* eslint-disable no-useless-escape */
// This is because jest use regexp as strings

module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/env/', '/documentation/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '[wW]*/dist/', '/documentation/'],
  setupFiles: ['./jest.setup.js'],
};

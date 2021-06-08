module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  globalSetup: '<rootDir>/test/jest.globalSetup.ts',
  globalTeardown: '<rootDir>/test/jest.globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'html',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/dist',
  ],
  testMatch: [
    '**/test/**/*.test.ts?(x)',
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
    '#mocks/(.*)': '<rootDir>/test/__mocks__/$1',
    '\\.(css|scss)$': '<rootDir>/test/__mocks__/css.ts',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'test/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
};

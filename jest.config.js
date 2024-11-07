// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
  };
  
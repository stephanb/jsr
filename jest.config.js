module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|less|sass)$': '<rootDir>/src/mocks/cssMock.ts',
  },
};

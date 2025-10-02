import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // moduleNameMapper: {
  //   '^src/(.*)$': '<rootDir>/src/$1',
  // },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    ...pathsToModuleNameMapper(compilerOptions.paths ?? {}, {
      prefix: '<rootDir>/',
    }),
  },
};

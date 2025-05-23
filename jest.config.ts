/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
import {JestConfigWithTsJest} from 'ts-jest';

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    NODE_ENV: 'test',
  },
  globalSetup: './tests/setup/global.ts',
  setupFilesAfterEnv: ['./tests/setup/index.ts'],
  clearMocks: true, // Automatically clear mock calls and instances between every test
  // collectCoverage: true,
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['storybook/', 'build/', 'docs/', 'node_modules/', 'tests/'],
  coverageReporters: ['text', 'html'],
  // coverageThreshold: {
  //   /**
  //    * Just in case
  //    * - https://jestjs.io/docs/configuration/#coveragethreshold-object
  //    * - https://github.com/istanbuljs/nyc#parsing-hints-ignoring-lines
  //    */
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/stubs/style-mock.js',
    '.(?:gif|png|jpe?g|svg|woff2?)$': '<rootDir>/tests/stubs/static-file.ts',
    '@boonya.dev/frontend-utils': '<rootDir>/packages/frontend-utils/src/index.ts',
    '@boonya.dev/frontend-utils/(.*)$': '<rootDir>/packages/frontend-utils/src/$1',
    '@boonya.dev/react-utils/(.*)$': '<rootDir>/packages/react-utils/src/$1',
    '@tests/(.*)$': '<rootDir>tests/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/packages/[^/]+/build/'],
  transformIgnorePatterns: ['/node_modules/', String.raw`\.pnp\.[^\/]+$`],
} satisfies JestConfigWithTsJest;

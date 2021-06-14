import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';
import type { Config } from '@jest/types';

export default {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    rootDir: './',
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions?.paths ?? {}, { prefix: '<rootDir>/' }),
        '^lodash-es$': 'lodash'
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    preset: 'ts-jest',
    snapshotSerializers: ['jest-serializer-vue'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\ts$': 'ts-jest'
    },
    testMatch: ['**/src/**/*.test.ts']
} as Config.InitialOptions;

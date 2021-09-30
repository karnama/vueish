import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';
import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

export default {
    clearMocks: true,
    testEnvironment: 'jsdom',
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
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.node.json'
        }
    }
} as InitialOptionsTsJest;

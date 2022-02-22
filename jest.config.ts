import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

export default {
    clearMocks: true,
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.vue',
        '!<rootDir>/src/**/Demo.vue',
        '!<rootDir>/src/DemoBoard.vue',
        '<rootDir>/src/components/**/*.ts',
        '<rootDir>/src/directives/**/*.ts',
        '<rootDir>/src/helpers/cache/**/*.ts',
        '<rootDir>/src/helpers/index.ts'
    ],
    coverageProvider: 'v8',
    coverageDirectory: '<rootDir>',
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
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\ts$': 'ts-jest'
    },
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.node.json'
        }
    }
} as InitialOptionsTsJest;

const path = require('path');

module.exports = {
    rootDir: path.join(__dirname, '../..'),
    roots: ['<rootDir>/'],
    preset: 'ts-jest',
    automock: false,
    clearMocks: true,
    coverageDirectory: '<rootDir>/coverage/',
    collectCoverageFrom: ['<rootDir>/packages/core/src/**/*.ts'],
    coverageReporters: ['json', 'html', 'lcov', 'text', 'text-summary', 'clover'],
    coverageThreshold: {global: {statements: 95, functions: 95, branches: 95, lines: 95}},
    globals: {'ts-jest': {diagnostics: true}},
    modulePaths: ['<rootDir>/packages/core/test'],
    moduleNameMapper: {'src/(.*)$': '<rootDir>/src/$1'},
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testRegex: ['(/test/.*|\\.(test|spec))\\.(js|jsx|ts|tsx)$'],
    transform: {'^.+\\.(js|jsx|ts|tsx)$': 'ts-jest'},
    testPathIgnorePatterns: ['<rootDir>/node_modules'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(xxxx.*?\\.js$))', 'index.*'],
    watchPathIgnorePatterns: ['<rootDir>/node_modules'],
};

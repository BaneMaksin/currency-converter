module.exports = {
    transform: {
        '\\.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js',
        '\\.js': 'babel-jest',
    },
    testRegex: '\\.test\\.(js|ts|tsx)$',
    modulePaths: [
        '<rootDir>/src/',
        '<rootDir>/node_modules/',
    ],
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
    ],
    moduleNameMapper: {
        '(\\.scss|\\.webfont\\.json)': 'identity-obj-proxy',
        '(\\.handlebars)': '<rootDir>/src/__mocks__/hbs.js',
        '\\.(jpg|png|gif|ttf|woff|eot|svg|html)': '<rootDir>/src/__mocks__/file-mock.js',
    },
    setupFiles: [
        './src/__testing__/setup.js',
    ],
    globals: {
        'ts-jest': {
            useBabelRc: true,
        },
    },
};

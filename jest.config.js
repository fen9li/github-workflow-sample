const random = require('lodash/random')

// Use a random port number for the mock API by default,
// to support multiple instances of Jest running
// simultaneously, like during pre-commit lint.
process.env.MOCK_API_PORT = process.env.MOCK_API_PORT || random(9000, 9999)

module.exports = {
  setupFiles: ['<rootDir>/tests/unit/setup', 'jest-canvas-mock'],
  setupTestFrameworkScriptFile: '<rootDir>/tests/unit/matchers',
  testMatch: ['**/(*.)unit.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleNameMapper: {
    '#mock-api/(.*)$': '<rootDir>/tests/mock-api/resources/$1',
    '^vue$': '<rootDir>/node_modules/vue',
    '^vuex$': '<rootDir>/node_modules/vuex',
    '^vue-router$': '<rootDir>/node_modules/vue-router',
    '@loyalty-corp/superadmin': '<rootDir>/packages/admin',
  },
  transformIgnorePatterns: ['/node_modules/(?!vue-resize-sensor)'],
  snapshotSerializers: ['jest-serializer-vue'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'packages/**/*.{js,vue}',
    '!**/node_modules/**',
  ],
  testURL:
    process.env.API_BASE_URL || `http://localhost:${process.env.MOCK_API_PORT}`,
  globals: {
    'vue-jest': {
      // Disable CSS compilation until it's more stable
      experimentalCSSCompile: false,
      babelConfig: {
        configFile: './babel.config.js',
      },
    },
  },
}

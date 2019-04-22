const { join } = require('path')
const cwd = process.cwd()

module.exports = {
  displayName: 'super',
  setupFiles: [join(cwd, '/tests/unit/setup')],
  globalSetup: join(cwd, '/tests/unit/global-setup'),
  globalTeardown: join(cwd, '/tests/unit/global-teardown'),
  setupTestFrameworkScriptFile: join(cwd, '/tests/unit/matchers'),
  testMatch: ['**/(*.)unit.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    // Transform any static assets to empty strings
    '\\.(jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf|css|less|scss)$':
      join(cwd, '/tests/unit/fixtures/empty-string.js'),
    '@lib/(.*)$': '<rootDir>/node_modules/@loyalty-corp/manage-lib/$1',
    '^@tests/$1': '<rootDir>/tests/$1',
    '^~/$1': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/main.js',
    '!src/app.vue',
    '!src/router/index.js',
    '!src/router/routes.js',
    '!src/state/store.js',
    '!src/state/helpers.js',
    '!src/state/modules/index.js',
    '!src/components/_globals.js',
  ],
  testURL:
    process.env.API_BASE_URL || `http://localhost:${process.env.MOCK_API_PORT}`,
}

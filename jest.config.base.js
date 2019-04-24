const merge = require('merge-deep')
const { join } = require('path')
const cwd = process.cwd()

const DEFAULT_CONFIG = {
  setupFiles: [join(cwd, '/tests/unit/setup')],
  globalSetup: join(cwd, '/tests/unit/global-setup'),
  globalTeardown: join(cwd, '/tests/unit/global-teardown'),
  setupTestFrameworkScriptFile: join(cwd, '/tests/unit/matchers'),
  snapshotSerializers: ['jest-serializer-vue'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  testMatch: ['**/(*.)unit.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    // Transform any static assets to empty strings
    '\\.(jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf|css|less|scss)$':
      join(cwd, '/tests/unit/fixtures/empty-string'),
    ...require('./aliases.config').jest,
  },
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
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
}

module.exports = function base(config = {}) {
  return merge(DEFAULT_CONFIG, config)
}

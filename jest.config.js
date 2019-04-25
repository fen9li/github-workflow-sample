const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const merge = require('merge-deep')
const lerna = require('./lerna.json')

process.env.MOCK_API_PORT = process.env.MOCK_API_PORT || _.random(9000, 9999)

function config(baseUrl, config = {}) {
  /*
   * Transform global aliases to jest paths
   */
  const aliases = _.transform(require('./aliases.config'), function(result, aliasTo, alias) {
    const hasExt = /\.\w+$/.test(aliasTo)
    const relativePath = `${baseUrl}/${aliasTo}`

    if (!fs.existsSync(relativePath)) return

    if (alias === '@lib' && /manage-lib/.test(baseUrl)) return

    const rootDir = `<rootDir>/${relativePath}`

    result[`^${alias}$`] = hasExt ? rootDir : `${rootDir}/index.js`
    result[`^${alias}/(.*)$`] = `${rootDir}/$1`


    // module.exports.jest['^' + alias + '/(.*)$'] =
    // '<rootDir>/' + aliases[alias] + '/$1'
  }, {})

  const DEFAULT_CONFIG = {
    setupFiles: ['<rootDir>/tests/unit/setup'],
    globalSetup: '<rootDir>/tests/unit/global-setup.js',
    globalTeardown: '<rootDir>/tests/unit/global-teardown',
    setupTestFrameworkScriptFile: '<rootDir>/tests/unit/matchers',
    snapshotSerializers: ['jest-serializer-vue'],
    coverageDirectory: '<rootDir>/tests/unit/coverage',
    testMatch: [`<rootDir>/${baseUrl}/**/(*.)unit.js`],
    moduleFileExtensions: ['js', 'json', 'vue'],
    testPathIgnorePatterns: [
      `<rootDir>/${baseUrl}/node_modules`,
    ],
    moduleNameMapper: {
      // Transform any static assets to empty strings
      '\\.(jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf|css|less|scss)$':
      '<rootDir>/tests/unit/fixtures/empty-string',
      ...aliases,
    },
    transformIgnorePatterns: ['node_modules/(?!@loyalty-corp/[^/]*/)'],
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

  return merge(DEFAULT_CONFIG, config)
}

const sources = []

lerna.packages.forEach(lernaPath => {
  const targetPath = path.join('./', lernaPath.replace('*', ''))

  fs.readdirSync(targetPath).forEach(folder => {
    const folderPath = path.join(targetPath, folder)

    if (fs.statSync(folderPath).isDirectory()) {
      const completePath = path.normalize(`${targetPath}/${folder}`)
      sources.push(completePath)
    }
  })
})


module.exports = {
  projects: sources.map(src => {
    return config(src, {
      displayName: src.split('/').pop(),
    })
  }),
}

const path = require('path')

const aliases = {
  '@': '.',
  '@src': 'src',
  '@core': 'src/core',
  '@router': 'src/router',
  '@views': 'src/router/views',
  '@layouts': 'src/router/layouts',
  '@components': 'src/components',
  '@assets': 'src/assets',
  '@utils': 'src/utils',
  '@state': 'src/state',
  '@design': 'src/styles/design/index.scss',
  '@mock-api': 'tests/mock-api',
}

module.exports = {
  webpack: {},
  jest: {},
  jsconfig: {},
}

for (const alias in aliases) {
  const aliasTo = aliases[alias]
  module.exports.webpack[alias] = resolveSrc(aliasTo)
  const aliasHasExtension = /\.\w+$/.test(aliasTo)
  module.exports.jest[`^${alias}$`] = aliasHasExtension
    ? `<rootDir>/${aliasTo}`
    : `<rootDir>/${aliasTo}/index.js`
  module.exports.jest[`^${alias}/(.*)$`] = `<rootDir>/${aliasTo}/$1`
  module.exports.jsconfig[alias + '/*'] = [aliasTo + '/*']
  module.exports.jsconfig[alias] = aliasTo.includes('/index.')
    ? [aliasTo]
    : [
      aliasTo + '/index.js',
      aliasTo + '/index.json',
      aliasTo + '/index.vue',
      aliasTo + '/index.scss',
      aliasTo + '/index.css',
    ]
}

function resolveSrc(_path) {
  return path.resolve(__dirname, _path)
}

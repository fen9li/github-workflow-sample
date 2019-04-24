const path = require('path')

const aliases = {
  '~': 'src',
  '@assets': 'src/assets',
  '@tests': 'tests',
  '@lib': 'node_modules/@loyalty-corp/manage-lib',
  '@root': '../..',
}

function resolve(_path) {
  return path.resolve(process.cwd(), _path)
}

const map = {
  webpack: {},
  jest: {},
}

for (const alias in aliases) {
  if (!aliases.hasOwnProperty(alias)) {
    return
  }

  const aliasTo = aliases[alias]
  const aliasHasExtension = /\.\w+$/.test(aliasTo)

  map.webpack[alias] = resolve(aliasTo)
  map.jest[`^${alias}$`] = aliasHasExtension
    ? `<rootDir>/${aliasTo}`
    : `<rootDir>/${aliasTo}/index.js`
  map.jest[`^${alias}/(.*)$`] = `<rootDir>/${aliasTo}/$1`
}

module.exports = map

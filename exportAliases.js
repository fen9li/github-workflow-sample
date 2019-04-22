const { resolve } = require('path')

function resolveSrc(_path) {
  return resolve(__dirname, _path)
}

module.exports = function exportAliases(aliases) {
  const aliasesMap = {
    webpack: {},
    jest: {},
  }

  for (const alias in aliases) {
    if (!aliases.hasOwnProperty(alias)) {
      return
    }

    const aliasTo = aliases[alias]
    const aliasHasExtension = /\.\w+$/.test(aliasTo)

    aliasesMap.webpack[alias] = resolveSrc(aliasTo)
    aliasesMap.jest[`^${alias}$`] = aliasHasExtension
      ? `<rootDir>/${aliasTo}`
      : `<rootDir>/${aliasTo}/index.js`
    aliasesMap.jest[`^${alias}/(.*)$`] = `<rootDir>/${aliasTo}/$1`
  }
}

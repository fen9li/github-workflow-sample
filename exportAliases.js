const { resolve } = require('path')

module.exports = function exportAliases(aliases, dirname) {
  function resolveSrc(_path) {
    return resolve(dirname, _path)
  }

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

  return aliasesMap
}

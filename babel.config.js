const packagesFolderName = 'packages'
const aliasesFileName = 'aliases.config.js'
const babelResolvePath = require('babel-plugin-module-resolver').resolvePath
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const packagesFolder = join(process.cwd(), packagesFolderName)
const isDirectory = src => lstatSync(src).isDirectory()
const getDirectories = src => readdirSync(src)
  .map(name => join(src, name))
  .filter(isDirectory)
const packagesPaths = getDirectories(packagesFolder)
const aliasesMap = packagesPaths.reduce((acc, p) => {
  try {
    const aliasesConfig = require(join(p, aliasesFileName))
    const webpackAliases = aliasesConfig.webpack

    if (webpackAliases) {
      acc[p] = webpackAliases
    }

    return acc
  } catch {
    return acc
  }
}, {})

function getCurrentPkgPath(currentFilePath) {
  const packagesCount = packagesPaths.length

  for (let i=0; i<packagesCount; i++) {
    const packagePath = packagesPaths[i]
    if (currentFilePath.startsWith(packagePath)) {
      return packagePath
    }
  }

  return ''
}

function getUsedAlias(sourcePath, aliasConfig) {
  const availableAliases = Object.keys(aliasConfig)
    .sort((a, b) => b.length - a.length)
  const availableAliasesCount = availableAliases.length

  for (let i=0; i<availableAliasesCount; i++) {
    const aliasName = availableAliases[i]

    if (sourcePath.startsWith(aliasName)) {
      return {
        usedAlias: aliasName,
        rest: sourcePath.slice(aliasName.length) || '',
      }
    }
  }

  return {}
}

function resolvePath(sourcePath, currentFilePath, opts) {
  const packagePath = getCurrentPkgPath(currentFilePath)
  if (sourcePath.indexOf('@mock') !== -1) {
    // throw new Error('EEEEEEEEEE')
    console.error('EEEEEEEEEE ', sourcePath)
  }
  if (!packagePath) {
    return babelResolvePath(sourcePath, currentFilePath, opts)
  }


  const aliasConfig = aliasesMap[packagePath]
  const { usedAlias, rest } = getUsedAlias(sourcePath, aliasConfig)

  if (usedAlias) {
    const aliasPath = aliasConfig[usedAlias]


    if (aliasPath) {
      return join(aliasPath, rest)
    }

    return babelResolvePath(sourcePath, currentFilePath, opts)
  }

  return babelResolvePath(sourcePath, currentFilePath, opts)
}

module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    'require-context-hook',
    '@babel/plugin-syntax-dynamic-import',
    ['module-resolver', { resolvePath }],
  ],
}

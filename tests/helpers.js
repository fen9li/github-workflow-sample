const { readdirSync, existsSync } = require('fs')
const { join } = require('path')

function getPackages() {
  const packagesFolder = join(process.cwd(), 'packages')
  const projects = readdirSync('./packages')
    .filter(pkgName => existsSync(join(packagesFolder, pkgName, 'jest.config.js')))
    .map(pkgName => `<rootDir>/packages/${pkgName}/jest.config.js`)

  return projects
}

module.exports = { getPackages }

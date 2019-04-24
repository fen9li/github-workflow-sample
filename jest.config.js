const { readdirSync, existsSync } = require('fs')
const { join } = require('path')
const _ = require('lodash')

process.env.MOCK_API_PORT = process.env.MOCK_API_PORT || _.random(9000, 9999)

module.exports = {
  projects: (() => {
    const packagesFolder = join(process.cwd(), 'packages')
    const projects = readdirSync('./packages')
      .filter(pkgName => existsSync(join(packagesFolder, pkgName, 'jest.config.js')))
      .map(pkgName => `<rootDir>/packages/${pkgName}/jest.config.js`)

    return projects
  })(),
}

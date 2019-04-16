const fs = require('fs')
const path = require('path')

const PACKAGES_PATH = path.resolve('./packages')

/*
 * return object { package_dir_name: package_name }
 */
function getAliases() {
  const dirs = fs.readdirSync(PACKAGES_PATH)
  const aliases = {}

  dirs.forEach(function(dir) {
    const dirPath = path.join(PACKAGES_PATH, dir)
    const stats = fs.statSync(dirPath)

    if (stats.isDirectory()) {
      const packagePath = path.join(dirPath, 'package.json')
      const pack = JSON.parse(fs.readFileSync(packagePath) || '')
      const name = pack.name

      aliases[dir] = name
    }
  })

  return aliases
}

module.exports = {
  getAliases,
}

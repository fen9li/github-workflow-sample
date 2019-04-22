const exportAliases = require('../../exportAliases.js')

const aliases = {
  '~': 'src',
  '@tests': 'tests',
  '@lib': 'node_modules/@loyalty-corp/manage-lib',
}

module.exports = exportAliases(aliases)

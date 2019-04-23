const exportAliases = require('../../exportAliases.js')

const aliases = {
  '~': 'src',
  '@assets': 'src/assets',
  '@tests': 'tests',
  '@lib': 'node_modules/@loyalty-corp/manage-lib',
}

module.exports = exportAliases(aliases, __dirname)

const shell = require('shelljs')
const { getAliases } = require('./utils')

const [, , command, target, ...restArgs] = process.argv

if (!command) {
  // console.log('no command')
  process.exit(1)
}

const ALIASES = getAliases()

if (target) {
  shell.exec(`lerna exec --scope ${ALIASES[target] || target || 'super'} -- yarn ${command} --color=always ${restArgs.join(' ')}` )
}

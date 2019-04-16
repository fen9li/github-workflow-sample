const shell = require('shelljs')
const { getAliases } = require('./utils')

const command = process.argv[2]

if (!command) {
  return console.log('no command')
}

let target = process.argv[3] || 'super'

const ALIASES = getAliases()

target = ALIASES[target] || target

if (target) {
  shell.exec(`lerna exec --scope ${target} -- yarn ${command} --color=always`)
}

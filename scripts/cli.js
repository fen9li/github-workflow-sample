const get = require('lodash/get')
const argv = require('yargs').argv
const path = require('path')
const inquirer = require('inquirer')
const fs = require('fs-extra')

const PACKAGES_PATH = path.join(__dirname, '..', 'packages')

/*
 * Register all child process here
 */
const SPAWNED_PROCS = []
const IS_WINDOWS = /^win/.test(process.platform)

/*
 * Available actions
 */
const CLI_ACTIONS = {
  link: linkPackages,
  unlink: unlinkPackages,
}

async function main() {
  const command = get(CLI_ACTIONS, argv._[0])

  if (command) command()
  else selectCommand()
}

function selectCommand() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select command:',
        choices: [
          {
            name: 'Register all packages locally',
            value: 'link',
          },
          {
            name: 'Unlink all packages locally',
            value: 'unlink',
          }
        ],
      },
    ])
    .then(answers => {
      const selectedAction = CLI_ACTIONS[answers.action]

      if (selectedAction) selectedAction()
      else ora(`Handler for action ${answers.action} does not exists`).fail()
    })
}

async function linkPackages() {
  const manager = await selectPackageManager()

  readPackages().forEach(packagePath => {
    const proc = require('child_process').spawn(
      IS_WINDOWS ? 'cmd' : manager,
      IS_WINDOWS ? ['/s', '/c', manager, 'link'] : ['link'],
      {
        stdio: 'inherit',
        env: process.env,
        cwd: packagePath,
      },
    )

    registerProcess(proc)
  })
}

async function unlinkPackages() {
  const manager = await selectPackageManager()

  readPackages().forEach(packagePath => {
    const proc = require('child_process').spawn(
      IS_WINDOWS ? 'cmd' : manager,
      IS_WINDOWS ? ['/s', '/c', manager, 'unlink'] : ['unlink'],
      {
        stdio: 'inherit',
        env: process.env,
        cwd: packagePath,
      },
    )

    registerProcess(proc)
  })
}

async function selectPackageManager() {
  // Temporary disabled npm
  return 'yarn'

  // inquirer.prompt([
  //   {
  //     type: 'list',
  //     name: 'manager',
  //     message: 'Select package manager:',
  //     default: 'yarn',
  //     choices: [
  //       {
  //         name: 'yarn',
  //         value: 'yarn',
  //       },
  //       {
  //         name: 'npm',
  //         value: 'npm',
  //       },
  //     ],
  //   },
  // ]).then(answers => answers.manager)
}

function readPackages() {
  return fs.readdirSync(PACKAGES_PATH).map(entry => {
    return path.join(PACKAGES_PATH, entry)
  }).filter(packagePath => {
    return fs.lstatSync(packagePath).isDirectory()
  })
}

function registerProcess(proc) {
  SPAWNED_PROCS.push(proc)
}

main()

process.on('SIGINT', () => {
  process.exit()
})

/*
 * Ensure that all child processes has finished
 */
process.on('exit', () => {
  SPAWNED_PROCS.forEach(proc => {
    proc.exit instanceof Function ? proc.exit() : proc.kill()
  })
})

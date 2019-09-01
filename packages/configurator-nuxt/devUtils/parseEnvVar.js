const { parsed } = require('dotenv').config()
const envVariables = {}

for (let key in parsed) {
  if (parsed.hasOwnProperty(key)) {
    envVariables[`process.env.${key}`] = JSON.stringify(parsed[key])
  }
}

module.exports = envVariables

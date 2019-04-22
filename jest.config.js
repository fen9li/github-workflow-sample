const _ = require('lodash')
const { getPackages } = require('./tests/helpers.js')

process.env.MOCK_API_PORT = process.env.MOCK_API_PORT || _.random(9000, 9999)

module.exports = {
  projects: getPackages(),
}

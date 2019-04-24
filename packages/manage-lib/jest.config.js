const base = require('../../jest.config.base')

module.exports = base({
  displayName: 'manage-lib',
  moduleNameMapper: {
    '^@lib/(.*)$': '<rootDir>',
  },
})

const fs = require('fs')

module.exports = require('../../vue.config.base')({
  devServer: {
    https: {
      key: fs.readFileSync('./server.key'),
      cert: fs.readFileSync('./server.crt'),
    },
  },
})

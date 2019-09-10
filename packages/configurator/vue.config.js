const fs = require('fs')
const path = require('path')

function resolve(target) {
  return path.join(__dirname, target)
}

module.exports = require('../../vue.config.base')({
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': resolve('node_modules/vue/dist/vue.esm.js'),
      },
    },
  },
  devServer: {
    https: {
      key: fs.readFileSync('./server.key'),
      cert: fs.readFileSync('./server.crt'),
    },
  },
})

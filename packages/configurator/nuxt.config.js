const configureWebpack = require('./devUtils/configureWebpack.js')
const { resolve } = require('path')
const { readFileSync } = require('fs')

module.exports = {
  srcDir: 'src',
  loading: false,
  plugins: [
    '~plugins/global',
  ],
  css: [
    '~/css/main.scss',
  ],
  build: {
    extend: configureWebpack,
  },
  modules: ['@nuxtjs/axios'],
  server: {
    port: 8080,
    timing: true,
    https: {
      key: readFileSync(resolve(__dirname, 'cert/server.key')),
      cert: readFileSync(resolve(__dirname, 'cert/server.crt')),
    },
  },
}

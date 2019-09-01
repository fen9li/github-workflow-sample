const configureWebpack = require('./devUtils/configureWebpack.js')
const { resolve } = require('path')
const { readFileSync } = require('fs')

module.exports = {
  srcDir: 'src',
  loading: false,
  plugins: [
    '~plugins/external',
    '~plugins/global',
  ],
  css: [
    '~/css/main.scss',
    'element-ui/lib/theme-chalk/index.css'
  ],
  build: {
    extend: configureWebpack,
    transpile: [
      /@loyalty-corp\//,
    ]
  },
  modules: [
    '@nuxtjs/axios'
  ],
  server: {
    port: 8080,
    timing: true,
    https: {
      key: readFileSync(resolve(__dirname, 'cert/server.key')),
      cert: readFileSync(resolve(__dirname, 'cert/server.crt')),
    },
  },
}

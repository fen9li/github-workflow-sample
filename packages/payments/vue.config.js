const path = require('path')
const appConfig = require('./src/app.config')
const babelConfig = require('./babel.config')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URI,
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appConfig.title,
    // Set up all the aliases we use in our app.
    resolve: {
      alias: require('./aliases.config').webpack,
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.ANALYZE ? 'static' : 'disabled',
        openAnalyzer: process.env.CI !== 'true',
      }),
    ],
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
  // Configure Webpack's dev server.
  // https://cli.vuejs.org/guide/cli-service.html
  devServer: {
    disableHostCheck: true,
    port: process.env.VUE_APP_DEV_PORT,
    ...(process.env.API_BASE_URL
      ? {
        proxy: {
          '/api': {
            target: process.env.API_BASE_URL,
          },
        },
      } : {
        before: require('./tests/mock-api'),
      }),
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .test(/\.js$/)
      .include.add(resolve('src'))
      .add(resolve('tests'))
      .add(resolve('node_modules/@loyalty-corp'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .options(babelConfig)

    // Following code resolves a cyclic deps error.
    // This bug is fixed in @vue/cli-service v3.0.5
    // But project uses @vue/cli-service@3.0.0-rc.9 now
    // see: https://github.com/vuejs/vue-cli/commit/744c375fba8b2055706f38b524a83fd5ea845686
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none'
      return args
    })
  },
}

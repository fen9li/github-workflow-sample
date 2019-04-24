const merge = require('merge-deep')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const DEFAULT_CONFIG = {
  publicPath: process.env.VUE_APP_BASE_URL,
  devServer: {
    disableHostCheck: true,
    public: process.env.VUE_APP_DEV_PUBLIC,
  },
  configureWebpack: {
    resolve: {
      alias: require('./aliases.config').webpack,
      symlinks: false,
    },
    name: process.env.VUE_APP_TITLE,
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.ANALYZE ? 'static' : 'disabled',
        openAnalyzer: process.env.CI !== 'true',
      }),
    ],
  },
  transpileDependencies: [
    /\bresize-detector\b/,
    /@loyalty-corp\/[^/]+\/src/,
    /@loyalty-corp\/[^/]+\/utils/,
    /@loyalty-corp\/[^/]+\/demo/,
    /@loyalty-corp\/[^/]+\/mixins/,
  ],
  chainWebpack: config => {
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

module.exports = function base(config = {}) {
  return merge(DEFAULT_CONFIG, config)
}

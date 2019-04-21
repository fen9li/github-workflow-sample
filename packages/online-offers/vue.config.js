const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  devServer: {
    disableHostCheck: true,
    public: process.env.VUE_APP_DEV_PUBLIC,
  },
  configureWebpack: {
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
}

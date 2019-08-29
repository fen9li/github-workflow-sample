const envVariables = require('./parseEnvVar.js')
const webpack = require('webpack')


module.exports = (config, { isDev, isClient, isServer, loaders }) => {
  config.output.crossOriginLoading = 'anonymous'
  config.resolve.extensions = ['.js', '.vue']

  config.plugins.push(
    new webpack.DefinePlugin(envVariables),
  )
}

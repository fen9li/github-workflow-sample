module.exports = {
  presets: ['@vue/app'],
  plugins: ['@babel/plugin-proposal-export-namespace-from'],
  env: {
    test: {
      presets: [
        [
          '@vue/app',
          {
            // Enable Babel's polyfills for Jest tests
            useBuiltIns: 'usage',
            // Use CommonJS modules for Jest tests
            modules: 'commonjs',
          },
        ],
      ],
      plugins: ['require-context-hook'],
    },
  },
}

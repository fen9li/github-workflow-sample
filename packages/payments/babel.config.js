module.exports = {
  presets: [
    [
      '@vue/app',
      {
        // Disable Babel's polyfills, replaced by the
        // polyfill.io service in index.html
        useBuiltIns: 'entry',
      },
    ],
  ],
  plugins: [
    // Support async/await
    // https://babeljs.io/docs/plugins/transform-runtime/
    [
      '@babel/transform-runtime',
      {
        helpers: true,
        corejs: 2,
        regenerator: true,
      },
    ],
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-dynamic-import',
  ],
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

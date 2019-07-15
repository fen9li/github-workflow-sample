module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'standard',
    'prettier',
    'google',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    semi: ['error', 'never'],
    indent: [
      'error',
      2,
      {
        ObjectExpression: 1,
        ArrayExpression: 1,
        flatTernaryExpressions: true,
        SwitchCase: 1,
      },
    ],
    'max-len': 'off',
    'vue/no-v-html': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'array-bracket-newline': ["error", "consistent"],
    'guard-for-in': 'off',
    'object-curly-spacing': ['error', 'always'],
    'require-jsdoc': 'off',
    // Only allow debugger in development
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    // Only allow `console.log` in development
    'no-console': process.env.PRE_COMMIT
      ? [
          'error',
          {
            allow: ['warn', 'error'],
          },
        ]
      : 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
  },
  overrides: [
    {
      files: ['src/**/*', 'tests/unit/**/*', 'tests/e2e/**/*'],
      excludedFiles: 'app.config.js',
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
      },
      env: {
        browser: true,
      },
    },
    {
      files: ['**/*.unit.js'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
      },
      env: {
        jest: true,
      },
      globals: {
        mount: false,
        shallowMount: false,
        shallowMountView: false,
        createComponentMocks: false,
        createModuleStore: false,
        createLocalVue: false,
      },
    },
  ],
}

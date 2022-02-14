module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'prettier',
    'plugin:vue/base',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
}

// for alias
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'chat',
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // before: require('./mock/mock-server.js'),
    proxy: {
      // サーバー
      '/api': {
        target: 'http://localhost:3100',
        // changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/variables.scss";`,
      },
    },
  },
}

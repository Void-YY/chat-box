import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesStore = require.context('./modules', true, /^\.\/.*store.*\.js+$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const asyncStates = modulesStore.keys().reduce((modules, modulePath) => {
  const pathArray = modulePath.split('.')
  const moduleName = pathArray[pathArray.length - 2]
  const value = modulesStore(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const allStates = Object.assign({}, modules, asyncStates)
const store = new Vuex.Store({
  modules: allStates,
  getters,
})

export default store

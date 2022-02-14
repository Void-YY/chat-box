import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from '@/route/index'
import store from '@/store/index'

import 'normalize.css'
import '@/style/main.scss'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// WebSockt設定
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const socketSettings = require('../config/socket.json')
const socketConfig = new VueSocketIO({
  connection: SocketIO(socketSettings.url + ':' + socketSettings.port, {
    transports: ['websocket'],
  }),
})

Vue.prototype.$event = require('../config/socket.json').event
Vue.use(socketConfig)

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')

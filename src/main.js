import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import moment from 'moment'
import VueMoment from 'vue-moment'
import VueI18n from 'vue-i18n'
import lang from './assets/lang'
import VueSkycons from 'vue-skycons'
import _ from 'lodash'

Vue.config.productionTip = false

Vue.prototype._ = _
Vue.use(VueI18n)
Vue.use(VueSkycons, { color: store.state.weather.color })
Vue.use(VueMoment, { moment })

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en',
  messages: lang
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

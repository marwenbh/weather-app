import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '../pages/Weather.page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: { name: 'Weather' }
  },
  {
    path: '/weather',
    name: 'Weather',
    component: Weather
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

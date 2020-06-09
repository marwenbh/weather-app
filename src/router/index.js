import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '../pages/Weather.page.vue'
import PageNotFound from '../components/shared/PageNotFound.page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: { name: 'Weather' }
  },
  {
    path: '/weather',
    name: 'Weather',
    component: Weather
  },
  {
    path: '*', name: 'PageNotFound', component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

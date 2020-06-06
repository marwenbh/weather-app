<template>
  <div id="app">
    <v-app>
        <router-view/>
        <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import Footer from '../src/components/footer/footer'
export default {
  components: {
    Footer
  },
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('weather/fetchTodaysWeather')
  }
}
</script>

<style land="scss" scoped>
@import '../src/assets/scss/style.scss'
</style>

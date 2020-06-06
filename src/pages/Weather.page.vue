<template>
  <!-- <v-container> -->
    <v-card v-if="currentWeather" :class="[journey==='dark' ? 'darkBackground' : 'lightBackground']">
      <!-- header component -->
      <Header> </Header>

      <div class="text-center pa-5 margin-style" :class="journey">
        <!-- current weather component -->
        <CurrentTemp :weatherCondition="getConditionWeather" :journey="journey"> </CurrentTemp>

        <!-- daily weather component -->
        <div class="ma-2 row">
            <div class="border-style col ml-1 text-center" v-for="(maxTemp, idx) in maxDailyWeather" :key="idx">
              <div class="mb-7"> <i> {{ $moment(maxTemp.dt_txt).locale($i18n.locale).format("dddd, Do MMMM") }} </i> </div>
              <DailyWeather :value="maxTemp" :weatherCondition="getCondition(maxTemp.weather[0].main, new Date(maxTemp.dt_txt).getHours())"></DailyWeather>
            </div>
        </div>
        <div class="justify-content-between ma-2 row" >
            <div class="col text-center" v-for="(value, idx) in maxDailyWeather" :key="idx">
              <span class="material-icons"> arrow_upward </span>
            </div>
        </div>
        <div class="ma-2 row">
            <div class="border-style col ml-1 text-center" v-for="(minTemp, ind) in minDailyWeather" :key="ind">
              <DailyWeather :value="minTemp" :weatherCondition="getCondition(minTemp.weather[0].main, new Date(minTemp.dt_txt).getHours())"></DailyWeather>
            </div>
        </div>
      </div>
    </v-card>
  <!-- </v-container> -->
</template>

<script src="https://rawgithub.com/darkskyapp/skycons/master/skycons.js"></script>
<script>
import { mapState } from 'vuex'
import Header from '../components/header/Header'
import CurrentTemp from '../components/weather/CurrentTemp'
import DailyWeather from '../components/weather/DailyWeather'

export default {
  components: {
    Header,
    CurrentTemp,
    DailyWeather
  },
  data () {
    return {
      time: null
    }
  },
  computed: {
    ...mapState ({
      currentWeather: state => state.weather.currentWeather,
      minDailyWeather: state => state.weather.minDailyWeather,
      maxDailyWeather: state => state.weather.maxDailyWeather
    }),
    getConditionWeather () {
      const time = new Date().getHours()
      const weatherMain = this.currentWeather.weather[0].main
      return this.getCondition(weatherMain, time)
    },
    journey () {
      this.time = new Date().getHours()
      return (this.time >= 21 || this.time < 4) ? 'dark' : 'light'
      // return 'dark'  // !!!!!!!!! To test dark mode
    }
  },
  methods: {
    getCondition(weatherMain, time) {
      let condition = ''
      switch (weatherMain.toLowerCase()) {
        case 'clouds':
          if (time >= 20 || time <= 4) {
            condition = 'partly-cloudy-night'
          } else {
            condition = 'cloudy'
          }
          break
        case 'rain':
          condition = 'rain'
          break
        case 'drizzle':
          condition = 'rain'
          break
        case 'thunderstorm':
          condition = 'rain'
          break
        case 'snow':
          condition = 'snow'
          break
        case 'clear':
          if (time >= 19 || time <= 4) {
            condition = 'clear-night'
          } else {
            condition = 'clear-day'
          }
          break
        default:
          condition = 'wind'
      }
      return condition
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.darkBackground {
  background-image:url('../assets/img/dark.jpg');
}

.lightBackground {
  background-image:url('../assets/img/light.jpg');
}
</style>

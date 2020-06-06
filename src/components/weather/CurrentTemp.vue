<template>
  <div class="ma-2 row justify-content-between">
    <div class="border-style col-5">
      <div class="d-flex">
        <skycon :condition="weatherCondition" :width="210" :height="210"> </skycon>
        <div class="ml-3" :class="journey">
          <div> {{ city ? city : currentWeather.name }} {{ state ? `, ${state}` : '' }} </div>
          <div> {{ $moment(new Date()).locale($i18n.locale).format("HH:mm") }} </div>
          <div class="display-3"> {{ unitTemperature === 'celsius' ? getCelsiusTemp(currentWeather.main.temp) : `${Math.trunc(currentWeather.main.temp)}°F` }} </div>
          <div>{{ $t(`app.currentTemp.dailyTemp.${_.camelCase(currentWeather.weather[0].description)}`) }} </div>
        </div>
      </div>
    </div>
    <div class="border-style col-5" :class="journey">
      <div>
        <div>
          <div> {{ $t('app.currentTemp.humidity')}} </div>
          <span class="display-3"> {{ currentWeather.main.humidity }}</span><span :class="journey">%</span>
        </div>
      </div>
      <div class="mt-10">
        <div> {{ $t('app.currentTemp.windSpeed')}} </div>
        <span class="display-3"> {{ currentWeather.wind.speed }}</span><span :class="journey">K/M</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  props: {
    journey: {
      type: String,
      default: ''
    },
    weatherCondition: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      currentWeather: state => state.weather.currentWeather,
      state: state => state.weather.ste,
      city: state => state.weather.city,
      unitTemperature: state => state.weather.unitTemperature
    })
  },
  methods: {
    getCelsiusTemp (temp) {
      return `${Math.round((parseInt(temp) - 32) * (5 / 9))}°`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
</style>

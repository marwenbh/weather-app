<template>
  <div class="d-flex">
    <div class="margin-style">
      <skycon :condition="weatherCondition" :width="50" :height="70"></skycon>
    </div>
    <div>
      <div> <b>{{ unitTemperature === 'celsius' ? getCelsiusTemp(value.main.temp) : `${Math.trunc(value.main.temp)}°F`}}</b> </div>
      <div style="max-width: 120px;"> {{ $t(`app.currentTemp.dailyTemp.${_.camelCase(value.weather[0].description)}`) }}</div>
      <div> {{ $moment(value.dt_txt).locale($i18n.locale).format("HH:mm") }}</div>
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
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    weatherCondition: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
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

.margin-style {
  margin-left: 15%;
}
</style>

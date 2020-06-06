<template>
  <div>
    <GenericPopup
      :value.sync="error"
      :title="$t('app.header.errorMsg.title')"
      :text="$t('app.header.errorMsg.message')"
      :rule="'error'"
      @confirm="confirmError($event)"
    ></GenericPopup>

    <GenericPopup
      v-model="favoritePopup"
      :title="$t('app.header.heartPopup.title')"
      :text="$t('app.header.heartPopup.message', {city: currentWeather.name})"
      :rule="'confirmation'"
      @confirm="addToFavoriteList($event)"
    ></GenericPopup>

    <GenericPopup
      v-model="noFavPopup"
      :title="$t('app.header.favorites.noFav.title')"
      :text="$t('app.header.favorites.noFav.message')"
      :rule="'error'"
      @confirm="noFavPopup = false"
    ></GenericPopup>

    <GenericPopup
      v-model="settingsPopup"
      :title="$t('app.header.settings.popup.title')"
      :text="$t('app.header.settings.popup.message')"
      :rule="'settings'"
      @confirm="convertTemperature($event)"
    ></GenericPopup>

    <GenericPopup
      v-model="favPopup"
      :title="$t('app.header.favorites.favList.title')"
      :text="$t('app.header.favorites.favList.message')"
      :rule="'fav'"
      :cities="favoriteCities.cities"
      @confirm="applyFavoriteCity($event)"
    ></GenericPopup>

    <v-app-bar
      color='rgba(44, 130, 201,0.5 )'
      height="75"
      dark
    >
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on">
            <v-icon>menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="chooseMenu(item.id)"
          >
            <v-list-item-title> {{ $t(`app.header.${item.title}.${item.id}`) }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-form v-model="isValid" @submit.prevent class="d-flex">
        <v-text-field
          class="ml-5"
          v-model="search"
          append-icon="search"
          :rules="search !== '' ? validation.format : []"
          @keypress="fetchWeather"
          :label="$t('app.header.search')"
          single-line
        ></v-text-field>
        <v-tooltip right
          color="indigo"
        >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" dark @click="refreshPage()">
            <v-icon>place</v-icon>
          </v-btn>
        </template>
        <span> {{ $t('app.header.currentLocation') }} </span>
      </v-tooltip>
      </v-form>

      <div class="text-center w-50">
          <v-toolbar-title > {{ $moment(new Date()).locale($i18n.locale).format("dddd, Do MMMM YYYY") }} </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-tooltip left
        color="indigo"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon
              @click="favoriteCities.cities.indexOf(currentWeather.name) === -1 ? favoritePopup = true : ''"
              :style="[favoriteCities.cities.indexOf(currentWeather.name) === -1 ? '' : {'color': 'red'}]"
            >
              mdi-heart
            </v-icon>
          </v-btn>
        </template>
        <span v-if="favoriteCities.cities.indexOf(currentWeather.name) === -1"> {{ $t('app.header.favorites.add') }} </span>
        <span v-else> {{ $t('app.header.favorites.exists') }} </span>
      </v-tooltip>
      <SelectLocale></SelectLocale>
    </v-app-bar>
  </div>
</template>

<script>
import GenericPopup from '../shared/GenericPopup'
import SelectLocale from '../shared/SelectLocale'
import { mapState } from 'vuex'
export default {
  components: {
    GenericPopup,
    SelectLocale
  },
  data () {
    return {
      city: '',
      country: '',
      items: [{ id: 'fav', title: 'favorites' }, { id: 'settings', title: 'settings' }],
      search: '',
      isValid: false,
      validation: {
        format: [value => (value.indexOf(',') !== -1 && value !== '') || 'ex: Paris, France'],
        required: [v => !!v || 'This field is required']
      },
      favoritePopup: false,
      noFavPopup: false,
      settingsPopup: false,
      favPopup: false
    }
  },
  computed: {
    ...mapState({
      currentWeather: state => state.weather.currentWeather,
      error: state => state.weather.errorOccured,
      favoriteCities: state => state.weather.favoriteCities
    })
  },
  created () {
    this.form = { search: '' }
  },
  methods: {
    confirmError ($event) {
      this.$store.commit('weather/errorOccured', false)
    },
    fetchWeather (event) {
      if (event.key === 'Enter' && this.isValid) { //   form is valid and user press Enter to search
        if (this.search.split(',').length === 2) {
          this.city = this.search.split(',')[0].trim()
          this.country = this.search.split(',')[1].trim()
          this.$store.dispatch('weather/fetchWeather', { country: this.country, city: this.city })
          this.search = ''
        }
      }
    },
    addToFavoriteList (event) {
      if (event) {
        this.favoritePopup = false
        this.$store.commit('weather/addToFavoriteList', this.currentWeather.name)
      }
    },
    convertTemperature ($event) {
      this.settingsPopup = false
      this.$store.commit('weather/setUnitTemp', $event)
    },
    applyFavoriteCity ($event) {
      this.favPopup = false
      this.$store.dispatch('weather/fetchWeather', { country: null, city: $event })
    },
    chooseMenu (idItem) {
      switch (idItem) {
        case 'fav':
          this.favoriteCities.cities.length === 0 ? this.noFavPopup = true : this.favPopup = true
          break
        default:
          this.settingsPopup = true
          break
      }
    },
    refreshPage () {
      this.search = ''
      this.$store.dispatch('weather/fetchTodaysWeather')
    }
  }
}
</script>

<style lang="scss" scoped>

.v-input {
  flex: unset !important;
}

</style>

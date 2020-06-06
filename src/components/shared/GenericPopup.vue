<template>
  <v-dialog v-model="value" persistent width="35%">
    <v-card>
      <v-card-title class="headline pa-2 error-style" v-if="rule === 'error'"> {{ title }} </v-card-title>
      <v-card-title class="headline pa-2" :style="{backgroundColor: journey}" style="color: white" v-else> {{ title }} </v-card-title>
      <v-card-text style="color:black">
        <p class="mt-10 mb-5" v-html="text"></p>

        <div v-if="rule === 'settings'">
          <v-radio-group v-model="unit" :mandatory="false">
            <v-radio label="Celsius (°C)" value="celsius"></v-radio>
            <v-radio label="Fahrenheit (°F)" value="fahrenheit"></v-radio>
          </v-radio-group>
        </div>

        <div v-if="rule === 'fav'" class="fav-list">
          <v-radio-group v-model="favCity" :mandatory="false">
            <v-radio v-for="(city,index) in cities" :key="index" :label="city" :value="city">
              <template v-slot:label>
                <div style="width:95%; margin-bottom: -25px;"> {{ city }}
                  <v-btn icon dark class="float-right" @click="deleteFromFavList(city)">
                    <v-icon color="#e1275f"> mdi-delete </v-icon>
                  </v-btn>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>

      </v-card-text>

      <v-card-actions class="d-flex justify-end pa-4 pt-0">
        <!--cancel button -->
        <v-btn
          v-if="rule !== 'error' && (!cities || cities.length !== 0)" text rounded @click="$emit('input', false)"
        >
          {{$t('app.actions.cancel')}}
        </v-btn>

        <!--confirm button -->
        <v-btn
          class="px-5"
          dark
          :color="journey"
          rounded
          v-if="cities && cities.length === 0"
          @click="$emit('input', false)"
        > {{ $t('app.actions.close')}}
        </v-btn>
        <v-btn
          class="px-5"
          dark
          :color="rule === 'error' ? '#e1275f': journey"
          rounded
          v-else
          @click="rule === 'settings' ? $emit('confirm', unit) : rule === 'fav' ? $emit('confirm', favCity) : $emit('confirm', true)"
        >
          {{ rule == 'error' ? 'ok' : $t('app.actions.confirm') }}
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      unit: 'celsius',
      favCity: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    rule: {
      type: String,
      default: ''
    },
    cities: {
      type: Array,
      default () {
        return null
      }
    }
  },
  created () {
    this.favCity = this.cities ? this.cities[0] : ''
  },
  computed: {
    journey () {
      return (new Date().getHours() >= 21 || new Date().getHours() < 4) ? '#0c2764' : 'rgb(44, 130, 201)'
    }
  },
  methods: {
    deleteFromFavList (city) {
      const previousFavList = JSON.parse(window.localStorage.getItem('favoriteCities')).cities
      this.$store.commit('weather/deleteFromFavList', previousFavList.splice(1))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
p {
  font-size: 1rem;
}

.fav-list {
  height: 200px;
  max-height: 200px;
  overflow: auto;
}
</style>

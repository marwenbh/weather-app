<template>
  <div class="selectLocale d-flex">
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on">
            <i class="material-icons"> language </i> {{ $i18n.locale }}
          </v-btn>
        </template>
        <v-list v-model="$i18n.locale">
          <v-list-item
            v-for="(lang, i) in langs"
            :key="`lang-${i}`"
            :value="$i18n.locale"
            @click="chooseLang(lang)"
          >
            <v-list-item-title> {{ lang }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
  </div>
</template>

<script>
export default {
  name: 'SelectLocale',
  data () {
    return {
      langs: ['en', 'fr']
    }
  },
  methods: {
    chooseLang (lang) {
      this.$i18n.locale = lang
      localStorage.setItem('lang', lang)
    }
  }
}
</script>

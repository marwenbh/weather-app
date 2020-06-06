<template>
  <div class="selectLocale d-flex">
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on">
            <i class="material-icons"> language </i> {{ lang }}
          </v-btn>
        </template>
        <v-list v-model="$i18n.locale">
          <v-list-item
            v-for="(lang, i) in langs"
            :key="`lang-${i}`"
            :value="lang"
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
      lang: 'en',
      langs: ['en', 'fr']
    }
  },
  methods: {
    chooseLang (lang) {
      this.lang = lang
      this.$i18n.locale = lang
    }
  }
}
</script>
